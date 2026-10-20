import type { TinaCMS } from "tinacms";

const WEBP_QUALITY = 0.85;
const configuredManagers = new WeakSet<TinaCMS["media"]>();

export async function convertJpegToWebp(file: File): Promise<File> {
  if (file.type !== "image/jpeg" && !/\.jpe?g$/i.test(file.name)) {
    return file;
  }

  const url = URL.createObjectURL(file);
  const image = new Image();
  let canvas: HTMLCanvasElement | undefined;

  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("The JPEG could not be decoded."));
      image.src = url;
    });

    canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Image conversion is unavailable in this browser.");
    context.drawImage(image, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas!.toBlob(resolve, "image/webp", WEBP_QUALITY);
    });
    // Unsupported encoders can silently return PNG instead of WebP.
    if (!blob || blob.type !== "image/webp") {
      throw new Error("This browser could not encode WebP. Try a current version of Chrome or Firefox.");
    }

    const filename = /\.jpe?g$/i.test(file.name)
      ? file.name.replace(/\.jpe?g$/i, ".webp")
      : `${file.name}.webp`;
    return new File([blob], filename, {
      type: "image/webp",
      lastModified: file.lastModified,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Image conversion failed.";
    throw new Error(`Could not convert "${file.name}" to WebP. ${reason}`);
  } finally {
    URL.revokeObjectURL(url);
    image.onload = null;
    image.onerror = null;
    image.src = "";
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }
}

export function enableWebpUploads(cms: TinaCMS): TinaCMS {
  const manager = cms.media;
  if (configuredManagers.has(manager)) return cms;
  configuredManagers.add(manager);

  const persist = manager.persist.bind(manager);
  // Wrap the manager so Tina can replace its store when switching branches
  // without losing conversion or changing authentication and upload events.
  manager.persist = async (uploads) => {
    const converted = [];
    try {
      // Decode photos sequentially to limit memory use during batch uploads.
      for (const upload of uploads) {
        converted.push({ ...upload, file: await convertJpegToWebp(upload.file) });
      }
    } catch (error) {
      cms.alerts.error(error instanceof Error ? error.message : "Image conversion failed.");
      throw error;
    }
    return persist(converted);
  };

  return cms;
}
