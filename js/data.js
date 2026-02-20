// RevVault — Car & Brand Data

export const BRANDS = [
  {
    id: 'ferrari',
    name: 'Ferrari',
    tagline: 'We are the competition',
    color: '#DC2626',
    logo: '🐴',
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    tagline: 'Expect the unexpected',
    color: '#F59E0B',
    logo: '🐂',
  },
  {
    id: 'porsche',
    name: 'Porsche',
    tagline: 'There is no substitute',
    color: '#6B7280',
    logo: '🐎',
  },
  {
    id: 'bmw',
    name: 'BMW',
    tagline: 'Sheer driving pleasure',
    color: '#3B82F6',
    logo: '◎',
  },
  {
    id: 'tesla',
    name: 'Tesla',
    tagline: 'Accelerating the future',
    color: '#10B981',
    logo: '⚡',
  },
];

export const CARS = [
  // ——— FERRARI ———
  {
    id: 'f-296gts',
    brand: 'ferrari',
    model: '296 GTS',
    year: 2024,
    hp: 830,
    torque: 740,
    engine: '3.0L V6 Hybrid',
    sprint: 2.9,
    topSpeed: 330,
    tags: ['hybrid', 'convertible', 'mid-engine'],
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    ],
    description: 'The Ferrari 296 GTS brings open-top thrills to the hybrid era, combining a twin-turbo V6 with an electric motor for breathtaking performance.'
  },
  {
    id: 'f-sf90',
    brand: 'ferrari',
    model: 'SF90 Stradale',
    year: 2023,
    hp: 986,
    torque: 800,
    engine: '4.0L V8 PHEV',
    sprint: 2.5,
    topSpeed: 340,
    tags: ['PHEV', 'coupe', 'flagship'],
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80',
    ],
    description: 'Ferrari\'s most powerful production car, the SF90 Stradale fuses three electric motors with a twin-turbo V8 for a frankly astonishing 986 hp.'
  },
  {
    id: 'f-812',
    brand: 'ferrari',
    model: '812 Competizione',
    year: 2022,
    hp: 830,
    torque: 692,
    engine: '6.5L V12',
    sprint: 2.85,
    topSpeed: 340,
    tags: ['NA', 'coupe', 'V12'],
    images: [
      'https://images.unsplash.com/photo-1626668011687-e53b6f88b43d?w=1200&q=80',
      'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    ],
    description: 'A naturally aspirated masterpiece. The 812 Competizione\'s 6.5-litre V12 screams to 9,500 rpm — a last stand for the pure combustion supercar.'
  },
  {
    id: 'f-roma',
    brand: 'ferrari',
    model: 'Roma',
    year: 2023,
    hp: 612,
    torque: 760,
    engine: '3.9L V8 TT',
    sprint: 3.4,
    topSpeed: 320,
    tags: ['GT', 'coupe', 'V8'],
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    ],
    description: 'Timeless Italian elegance meets modern performance. The Ferrari Roma is a grand tourer that turns every drive into a work of art.'
  },
  {
    id: 'f-daytona',
    brand: 'ferrari',
    model: 'Daytona SP3',
    year: 2022,
    hp: 840,
    torque: 697,
    engine: '6.5L V12',
    sprint: 2.85,
    topSpeed: 340,
    tags: ['limited', 'open-top', 'V12'],
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
      'https://images.unsplash.com/photo-1626668011687-e53b6f88b43d?w=800&q=80',
    ],
    description: 'The Daytona SP3 is Ferrari\'s Icona series tribute to the legendary 1967 Le Mans podium — 840 hp of naturally aspirated fury in a targa silhouette.'
  },

  // ——— LAMBORGHINI ———
  {
    id: 'l-revuelto',
    brand: 'lamborghini',
    model: 'Revuelto',
    year: 2024,
    hp: 1001,
    torque: 725,
    engine: '6.5L V12 PHEV',
    sprint: 2.5,
    topSpeed: 350,
    tags: ['PHEV', 'coupe', 'flagship'],
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    ],
    description: 'The Revuelto is Lamborghini\'s first PHEV supercar — 1,001 horsepower, an all-new V12, and three electric motors rewriting what a Lamborghini can be.'
  },
  {
    id: 'l-huracan',
    brand: 'lamborghini',
    model: 'Huracán EVO',
    year: 2023,
    hp: 631,
    torque: 600,
    engine: '5.2L V10',
    sprint: 2.9,
    topSpeed: 325,
    tags: ['NA', 'coupe', 'V10'],
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80',
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
    ],
    description: 'The Huracán EVO refines the iconic V10 formula with LDVI predictive dynamics and an infotainment system, without losing an ounce of drama.'
  },
  {
    id: 'l-urus',
    brand: 'lamborghini',
    model: 'Urus S',
    year: 2023,
    hp: 666,
    torque: 850,
    engine: '4.0L V8 Biturbo',
    sprint: 3.5,
    topSpeed: 305,
    tags: ['SUV', 'AWD', 'biturbo'],
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    ],
    description: 'The Urus S bridges Lamborghini\'s DNA with everyday usability — a 666 hp SUV that outruns most sports cars while seating four in volcanic comfort.'
  },
  {
    id: 'l-huracan-sto',
    brand: 'lamborghini',
    model: 'Huracán STO',
    year: 2022,
    hp: 640,
    torque: 565,
    engine: '5.2L V10',
    sprint: 3.0,
    topSpeed: 310,
    tags: ['track', 'coupe', 'V10'],
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
    ],
    description: 'Super Trofeo Omologata — street-legal race car with full carbon body, racing aero, and a V10 that will electrify every corner of every road.'
  },
  {
    id: 'l-sian',
    brand: 'lamborghini',
    model: 'Sián FKP 37',
    year: 2021,
    hp: 819,
    torque: 720,
    engine: '6.5L V12 Hybrid',
    sprint: 2.8,
    topSpeed: 350,
    tags: ['limited', 'hybrid', 'V12'],
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80',
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
    ],
    description: 'Lamborghini\'s first hybrid hypercar, the Sián uses a supercapacitor for instant torque boosts — all 63 units sold before a single image was released.'
  },

  // ——— PORSCHE ———
  {
    id: 'p-911gt3',
    brand: 'porsche',
    model: '911 GT3 RS',
    year: 2024,
    hp: 518,
    torque: 465,
    engine: '4.0L Flat-6',
    sprint: 3.2,
    topSpeed: 296,
    tags: ['track', 'NA', 'flat-6'],
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80',
      'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    ],
    description: 'The 911 GT3 RS is Porsche\'s most focused road-legal weapon — massive DRS wing, active aero, and a howling flat-six with track-day rubber.'
  },
  {
    id: 'p-taycan',
    brand: 'porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    hp: 938,
    torque: 1050,
    engine: 'Dual Electric Motor',
    sprint: 2.4,
    topSpeed: 260,
    tags: ['EV', 'sedan', 'AWD'],
    images: [
      'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    ],
    description: 'Porsche\'s electric revolution — the Taycan Turbo S delivers 938 hp, sub-2.4s 0-100, and a 800V architecture that charges at 270kW.'
  },
  {
    id: 'p-918',
    brand: 'porsche',
    model: '918 Spyder',
    year: 2015,
    hp: 887,
    torque: 1280,
    engine: '4.6L V8 PHEV',
    sprint: 2.5,
    topSpeed: 345,
    tags: ['limited', 'PHEV', 'hypercar'],
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80',
      'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&q=80',
    ],
    description: 'The 918 Spyder proved hybrid tech could make the world\'s fastest cars even faster — 7:14 on the Nürburgring changed supercar engineering forever.'
  },
  {
    id: 'p-cayman',
    brand: 'porsche',
    model: 'Cayman GT4 RS',
    year: 2023,
    hp: 493,
    torque: 450,
    engine: '4.0L Flat-6',
    sprint: 3.4,
    topSpeed: 315,
    tags: ['coupe', 'NA', 'mid-engine'],
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
      'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&q=80',
    ],
    description: 'Fitted with the 911 GT3\'s engine, the Cayman GT4 RS puts the debate to rest — this 493 hp mid-engine screamer is the purest Porsche you can buy.'
  },
  {
    id: 'p-panamera',
    brand: 'porsche',
    model: 'Panamera Turbo S',
    year: 2024,
    hp: 630,
    torque: 820,
    engine: '4.0L V8 TT',
    sprint: 3.1,
    topSpeed: 315,
    tags: ['sedan', 'V8', 'AWD'],
    images: [
      'https://images.unsplash.com/photo-1547744152-14d985cb937f?w=1200&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80',
    ],
    description: 'The Panamera Turbo S is the definitive sports sedan — 630 hp, active suspension, and room for four adults who refuse to compromise on speed.'
  },

  // ——— BMW ———
  {
    id: 'b-m1000rr',
    brand: 'bmw',
    model: 'M8 Competition',
    year: 2024,
    hp: 617,
    torque: 750,
    engine: '4.4L V8 TT',
    sprint: 3.2,
    topSpeed: 305,
    tags: ['coupe', 'AWD', 'V8'],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80',
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800&q=80',
    ],
    description: 'The BMW M8 Competition is a grand tourer with a split personality — whisper-quiet cruiser or 617 hp fire-breather depending on which button you press.'
  },
  {
    id: 'b-m3cs',
    brand: 'bmw',
    model: 'M3 CS',
    year: 2024,
    hp: 543,
    torque: 650,
    engine: '3.0L I6 TT',
    sprint: 3.4,
    topSpeed: 302,
    tags: ['sedan', 'AWD', 'I6'],
    images: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800&q=80',
    ],
    description: 'The M3 CS distills BMW\'s sports sedan obsession into its most extreme form — 543 hp, carbon bodywork, and race-tuned suspension for road and track.'
  },
  {
    id: 'b-xm',
    brand: 'bmw',
    model: 'XM Label Red',
    year: 2024,
    hp: 738,
    torque: 1000,
    engine: '4.4L V8 PHEV',
    sprint: 3.8,
    topSpeed: 290,
    tags: ['SUV', 'PHEV', 'AWD'],
    images: [
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=1200&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80',
    ],
    description: 'BMW\'s XM Label Red is a statement of excess — 738 hp from a PHEV V8, a sculpture of a body, and 1,000 Nm of torque to silence any doubters.'
  },
  {
    id: 'b-csl',
    brand: 'bmw',
    model: 'M4 CSL',
    year: 2023,
    hp: 543,
    torque: 650,
    engine: '3.0L I6 TT',
    sprint: 3.7,
    topSpeed: 307,
    tags: ['coupe', 'limited', 'I6'],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800&q=80',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80',
    ],
    description: 'CSL: Coupé Sport Lightweight. The M4 CSL sheds 100 kg versus the standard car and gains a roofline so aggressive it\'s borderline illegal.'
  },
  {
    id: 'b-i8',
    brand: 'bmw',
    model: 'i8 Roadster',
    year: 2020,
    hp: 374,
    torque: 570,
    engine: '1.5L I3 PHEV',
    sprint: 4.6,
    topSpeed: 250,
    tags: ['PHEV', 'convertible', 'hybrid'],
    images: [
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800&q=80',
    ],
    description: 'A design study became a production reality — the i8 Roadster\'s scissor doors and carbon tub were science fiction on a showroom floor.'
  },

  // ——— TESLA ———
  {
    id: 't-plaid',
    brand: 'tesla',
    model: 'Model S Plaid',
    year: 2024,
    hp: 1020,
    torque: 1420,
    engine: 'Tri-Motor Electric',
    sprint: 2.1,
    topSpeed: 322,
    tags: ['EV', 'sedan', 'AWD'],
    images: [
      'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1200&q=80',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
      'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=800&q=80',
    ],
    description: 'The Model S Plaid rewrote the drag racing record book. 1,020 hp, a 0-100 in 2.1 seconds, and a yoke steering wheel that divides opinions globally.'
  },
  {
    id: 't-roadster',
    brand: 'tesla',
    model: 'Roadster',
    year: 2025,
    hp: 1915,
    torque: 2010,
    engine: 'Tri-Motor Electric',
    sprint: 1.9,
    topSpeed: 400,
    tags: ['EV', 'convertible', 'hypercar'],
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80',
      'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800&q=80',
      'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=800&q=80',
    ],
    description: 'The next-gen Tesla Roadster promises to break every record — sub-2s 0-100, 400+ km/h top speed, and optional SpaceX rocket thrusters for good measure.'
  },
  {
    id: 't-mxp',
    brand: 'tesla',
    model: 'Model X Plaid',
    year: 2024,
    hp: 1020,
    torque: 1280,
    engine: 'Tri-Motor Electric',
    sprint: 2.6,
    topSpeed: 262,
    tags: ['EV', 'SUV', 'AWD'],
    images: [
      'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=1200&q=80',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
      'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800&q=80',
    ],
    description: 'Seven seats. Falcon-wing doors. 2.6 seconds to 100. The Model X Plaid is Tesla\'s most absurd achievement — a family SUV with supercar numbers.'
  },
  {
    id: 't-m3p',
    brand: 'tesla',
    model: 'Model 3 Performance',
    year: 2024,
    hp: 460,
    torque: 660,
    engine: 'Dual-Motor Electric',
    sprint: 3.1,
    topSpeed: 261,
    tags: ['EV', 'sedan', 'AWD'],
    images: [
      'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1200&q=80',
      'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=800&q=80',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    ],
    description: 'The gateway drug to electric performance. The Model 3 Performance has been updated with a stiffer chassis, better brakes, and a revised dual-motor AWD system.'
  },
  {
    id: 't-ct',
    brand: 'tesla',
    model: 'Cybertruck AWD',
    year: 2024,
    hp: 600,
    torque: 930,
    engine: 'Dual-Motor Electric',
    sprint: 4.1,
    topSpeed: 209,
    tags: ['EV', 'truck', 'AWD'],
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80',
      'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800&q=80',
      'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=800&q=80',
    ],
    description: 'Love it or hate it, the Cybertruck is impossible to ignore. Built from ultra-hard stainless steel, it looks like it drove straight off a sci-fi film set.'
  },
];

export function getBrandById(id) {
  return BRANDS.find(b => b.id === id);
}

export function getCarById(id) {
  return CARS.find(c => c.id === id);
}

export function getCarsByBrand(brandId) {
  return CARS.filter(c => c.brand === brandId);
}
