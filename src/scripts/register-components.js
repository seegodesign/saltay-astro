import { registerAstroComponent } from '@cloudcannon/editable-regions/astro';
import Hero from '../components/Hero.astro';
import Treatments from '../components/Treatments.astro';
import Care from '../components/Care.astro';
import Booking from '../components/Booking.astro';
registerAstroComponent('Hero', Hero);
registerAstroComponent('Treatments', Treatments);
registerAstroComponent('Care', Care);
registerAstroComponent('Booking', Booking);
