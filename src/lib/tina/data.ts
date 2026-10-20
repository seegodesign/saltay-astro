import { requestWithMetadata } from '@tinacms/astro';
import client from '../../../tina/__generated__/client';

export const getMusings = async () => requestWithMetadata(
  client.queries.musingsConnection({ sort: 'date', last: 100 }),
  { priority: 'primary' },
);

export const getMusing = async (slug: string) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid musing slug');
  return requestWithMetadata(
    client.queries.musings({ relativePath: `${slug}.json` }),
    { priority: 'primary' },
  );
};

export const getSpaAddOns = async () => {
  const result = await requestWithMetadata(
    client.queries.page({ relativePath: 'spa-add-ons.json' }),
    { priority: 'primary' },
  );
  const page = result.data.page;
  if (page.__typename !== 'PageSpaAddOns') throw new Error('Expected the Spa Add-ons page template');
  return { ...result, data: { ...result.data, page } };
};

export const getTreatments = async () => {
  const result = await requestWithMetadata(
    client.queries.page({ relativePath: 'treatments.json' }),
    { priority: 'primary' },
  );
  const page = result.data.page;
  if (page.__typename !== 'PageTreatments') throw new Error('Expected the Treatments page template');
  return { ...result, data: { ...result.data, page } };
};

export const getHome = async () => {
  const result = await requestWithMetadata(
    client.queries.page({ relativePath: 'home.json' }),
    { priority: 'primary' },
  );
  const page = result.data.page;
  if (page.__typename !== 'PageHome') throw new Error('Expected the Home page template');
  return { ...result, data: { ...result.data, page } };
};

export const getPricing = async () => {
  const result = await requestWithMetadata(
    client.queries.page({ relativePath: 'pricing.json' }),
    { priority: 'primary' },
  );
  const page = result.data.page;
  if (page.__typename !== 'PagePricing') throw new Error('Expected the Pricing page template');
  return { ...result, data: { ...result.data, page } };
};

export const getAbout = async () => {
  const result = await requestWithMetadata(
    client.queries.page({ relativePath: 'about.json' }),
    { priority: 'primary' },
  );
  const page = result.data.page;
  if (page.__typename !== 'PageAbout') throw new Error('Expected the About page template');
  return { ...result, data: { ...result.data, page } };
};

export const getDiscountedPricing = async () => {
  const result = await requestWithMetadata(
    client.queries.page({ relativePath: 'discounted-pricing.json' }),
    { priority: 'primary' },
  );
  const page = result.data.page;
  if (page.__typename !== 'PageDiscountedPricing') throw new Error('Expected the Discounted Pricing page template');
  return { ...result, data: { ...result.data, page } };
};

export const getSignatureExperiences = async () => {
  const result = await requestWithMetadata(
    client.queries.page({ relativePath: 'signature-experiences.json' }),
    { priority: 'primary' },
  );
  const page = result.data.page;
  if (page.__typename !== 'PageSignatureExperiences') throw new Error('Expected the Signature Experiences page template');
  return { ...result, data: { ...result.data, page } };
};

export const getBookWithUs = async () => {
  const result = await requestWithMetadata(client.queries.page({ relativePath: 'book-with-us.json' }), { priority: 'primary' });
  const page = result.data.page;
  if (page.__typename !== 'PageBookWithUs') throw new Error('Expected the BookWithUs page template');
  return { ...result, data: { ...result.data, page } };
};

export const getSpaPackages = async () => {
  const result = await requestWithMetadata(client.queries.page({ relativePath: 'signature-spa-packages.json' }), { priority: 'primary' });
  const page = result.data.page;
  if (page.__typename !== 'PageWellnessDetail') throw new Error('Expected the WellnessDetail page template');
  return { ...result, data: { ...result.data, page } };
};

export const getAcupuncture = async () => {
  const result = await requestWithMetadata(client.queries.page({ relativePath: 'acupuncture.json' }), { priority: 'primary' });
  const page = result.data.page;
  if (page.__typename !== 'PageWellnessDetail') throw new Error('Expected the WellnessDetail page template');
  return { ...result, data: { ...result.data, page } };
};

export const getKeiki = async () => {
  const result = await requestWithMetadata(client.queries.page({ relativePath: 'keiki-children.json' }), { priority: 'primary' });
  const page = result.data.page;
  if (page.__typename !== 'PageWellnessDetail') throw new Error('Expected the WellnessDetail page template');
  return { ...result, data: { ...result.data, page } };
};

export const getCommunity = async () => {
  const result = await requestWithMetadata(client.queries.page({ relativePath: 'community.json' }), { priority: 'primary' });
  const page = result.data.page;
  if (page.__typename !== 'PageCommunity') throw new Error('Expected the Community page template');
  return { ...result, data: { ...result.data, page } };
};

export const getLocations = async () => {
  const result = await requestWithMetadata(client.queries.page({ relativePath: 'locations.json' }), { priority: 'primary' });
  const page = result.data.page;
  if (page.__typename !== 'PageLocations') throw new Error('Expected the Locations page template');
  return { ...result, data: { ...result.data, page } };
};
