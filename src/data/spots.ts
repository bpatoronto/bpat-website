import plazaPhoto from '../assets/spot-plaza.svg'
import apartmentPhoto from '../assets/spot-apartment.svg'
import winPhoto from '../assets/spot-win.svg'

export type Category = 'plaza' | 'apartment' | 'win'

export type Spot = {
  name: string
  note: string
  category: Category
  position: [number, number]
}

// Demonstration data while the mapping team builds the real database
export const spots: Spot[] = [
  { name: 'Wexford Heights Plaza', note: 'Large strip mall on Lawrence Ave E — ample car parking, no bike racks found.', category: 'plaza', position: [43.745, -79.295] },
  { name: 'Golden Mile Plaza', note: 'Big-box plaza on Eglinton Ave E with acres of asphalt and nowhere to lock up.', category: 'plaza', position: [43.726, -79.285] },
  { name: 'Bridlewood Mall', note: 'Community mall at Warden & Finch — no rings or racks at main entrances.', category: 'plaza', position: [43.797, -79.317] },
  { name: 'Parkway Mall', note: 'Victoria Park & Ellesmere plaza — busy local destination, zero bike parking.', category: 'plaza', position: [43.766, -79.305] },
  { name: 'Albion Centre', note: 'Etobicoke shopping centre with significant unused space near entrances.', category: 'plaza', position: [43.741, -79.584] },
  { name: 'Cliffside Plaza', note: 'Kingston Rd strip — local shops reachable by bike, nowhere to park one.', category: 'plaza', position: [43.715, -79.245] },
  { name: 'Jane & Wilson Plaza', note: 'Corner plaza serving a dense residential area — no racks on site.', category: 'plaza', position: [43.727, -79.51] },
  { name: 'Thorncliffe Park towers', note: 'Postwar apartment community — no secure resident bike storage.', category: 'apartment', position: [43.704, -79.345] },
  { name: 'Flemingdon Park towers', note: '1960s towers where residents carry bikes up elevators or go without.', category: 'apartment', position: [43.718, -79.331] },
  { name: 'St. James Town', note: 'One of Canada’s densest neighbourhoods — minimal secure bike parking.', category: 'apartment', position: [43.669, -79.375] },
  { name: 'Danforth–Woodbine racks', note: 'Example of what success looks like: visible, plentiful main-street parking.', category: 'win', position: [43.685, -79.312] },
  { name: 'Roncesvalles ring-and-posts', note: 'Ring-and-posts at regular intervals serving every storefront.', category: 'win', position: [43.646, -79.448] },
]

// Placeholder art per category until the mapping team has real site photos.
// When a spot gains a `photo` field, prefer it over these.
export const photoFor = (category: Category) =>
  category === 'win' ? winPhoto : category === 'plaza' ? plazaPhoto : apartmentPhoto

export const labelFor = (category: Category) =>
  category === 'win' ? 'Win' : category === 'plaza' ? 'Plaza gap' : 'Apartment gap'

export const styleFor = (category: Category) =>
  category === 'win'
    ? { color: '#276266', fillColor: '#276266', fillOpacity: 0.9 }
    : category === 'plaza'
      ? { color: '#276266', fillColor: '#ffffff', fillOpacity: 0.9 }
      : { color: '#17373a', fillColor: '#92c3c5', fillOpacity: 0.9 }
