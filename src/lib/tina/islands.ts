import Locations from '../../components/Locations.astro';
import { getLocations } from './data';
import Community from '../../components/Community.astro';
import { getCommunity } from './data';
import WellnessDetail from '../../components/WellnessDetail.astro';
import Musings from '../../components/Musings.astro';
import Musing from '../../components/Musing.astro';
import { getMusings, getMusing } from './data';
import BookWithUs from '../../components/BookWithUs.astro';
import { getBookWithUs, getSpaPackages, getAcupuncture, getKeiki } from './data';
import SignatureExperiences from '../../components/SignatureExperiences.astro';
import { getSignatureExperiences } from './data';
import type { IslandRegistry } from '@tinacms/astro/experimental';
import SpaAddOns from '../../components/SpaAddOns.astro';
import { getSpaAddOns } from './data';
import Home from '../../components/Home.astro';
import PricingMenu from '../../components/PricingMenu.astro';
import DiscountedPricing from '../../components/DiscountedPricing.astro';
import About from '../../components/About.astro';
import TreatmentsOverview from '../../components/TreatmentsOverview.astro';
import { getHome, getPricing, getAbout, getDiscountedPricing, getTreatments } from './data';

export const islands: IslandRegistry = {
  locations: {
    fetch: () => getLocations(), component: Locations,
    wrapper: { tag: 'div', className: 'locations-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getLocations>>).data.page }),
  },
  community: {
    fetch: () => getCommunity(), component: Community,
    wrapper: { tag: 'div', className: 'community-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getCommunity>>).data.page }),
  },
  musings: {
    fetch: () => getMusings(), component: Musings,
    wrapper: { tag: 'div', className: 'musings-content' },
    propsFromData: (result) => ({ connection: (result as Awaited<ReturnType<typeof getMusings>>).data.musingsConnection }),
  },
  musing: {
    fetch: (_request, params) => getMusing(params.get('slug') ?? ''), component: Musing,
    wrapper: { tag: 'div', className: 'musing-content' },
    propsFromData: (result) => ({ post: (result as Awaited<ReturnType<typeof getMusing>>).data.musings }),
  },
  keiki: {
    fetch: () => getKeiki(), component: WellnessDetail,
    wrapper: { tag: 'div', className: 'keiki-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getKeiki>>).data.page }),
  },
  acupuncture: {
    fetch: () => getAcupuncture(), component: WellnessDetail,
    wrapper: { tag: 'div', className: 'acupuncture-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getAcupuncture>>).data.page }),
  },
  spaPackages: {
    fetch: () => getSpaPackages(), component: WellnessDetail,
    wrapper: { tag: 'div', className: 'spaPackages-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getSpaPackages>>).data.page }),
  },
  bookWithUs: {
    fetch: () => getBookWithUs(), component: BookWithUs,
    wrapper: { tag: 'div', className: 'bookWithUs-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getBookWithUs>>).data.page }),
  },
  signatureExperiences: {
    fetch: () => getSignatureExperiences(),
    component: SignatureExperiences,
    wrapper: { tag: 'div', className: 'signature-experiences-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getSignatureExperiences>>).data.page }),
  },
  spaAddOns: {
    fetch: () => getSpaAddOns(),
    component: SpaAddOns,
    wrapper: { tag: 'div', className: 'spa-add-ons-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getSpaAddOns>>).data.page }),
  },
  treatments: {
    fetch: () => getTreatments(),
    component: TreatmentsOverview,
    wrapper: { tag: 'div', className: 'treatments-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getTreatments>>).data.page }),
  },
  discountedPricing: {
    fetch: () => getDiscountedPricing(),
    component: DiscountedPricing,
    wrapper: { tag: 'div', className: 'discounted-pricing-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getDiscountedPricing>>).data.page }),
  },
  about: {
    fetch: () => getAbout(),
    component: About,
    wrapper: { tag: 'div', className: 'about-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getAbout>>).data.page }),
  },
  home: {
    fetch: () => getHome(),
    component: Home,
    wrapper: { tag: 'div', className: 'home-content' },
    propsFromData: (result) => ({ home: (result as Awaited<ReturnType<typeof getHome>>).data.page }),
  },
  pricing: {
    fetch: () => getPricing(),
    component: PricingMenu,
    wrapper: { tag: 'div', className: 'pricing-content' },
    propsFromData: (result) => ({ page: (result as Awaited<ReturnType<typeof getPricing>>).data.page }),
  },
};
