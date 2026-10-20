/** Requested legacy paths that share content with an existing local page. */
export const pageAliases = {
  'home': 'home',
  'spa-treatments': 'treatments',
  'spa-treatments/signature-experiences': 'signatureExperiences',
  'botanical-bliss': 'botanical-bliss',
  'battlefield-medicine-to-pampered-spa-herbal-therapies': 'battlefield-medicine-to-pampered-spa-herbal-therapies',
} as const;

/** Empty legacy detail pages can use their already imported experience content. */
export const experienceRoutes = {
  'spa-treatments/signature-experiences/botanical-bliss': 'botanical-bliss',
  'spa-treatments/signature-experiences/the-immortal-dragon': 'immortal-dragon',
  'spa-treatments/signature-experiences/the-saltay-seahorse': 'saltay-seahorse',
  'spa-treatments/signature-experiences/elemental-escape': 'elemental-escape',
  'spa-treatments/signature-experiences/the-mermaids-journey': 'the-mermaids-journey',
  'spa-treatments/kissed-by-an-octopus': 'octopus-embrace',
} as const;
