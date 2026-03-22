export type PropertyStatus = "Active" | "Pending" | "Sold";

export type PropertyImage = {
  id: string;
  alt: string;
  gradient: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  type: "Penthouse" | "Townhome" | "Condo" | "Villa" | "Estate";
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  status: PropertyStatus;
  description: string;
  features: string[];
  heroLabel: string;
  agentSlug: string;
  images: PropertyImage[];
  lat: number;
  lng: number;
};

export type AgentReview = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export type Agent = {
  slug: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  bio: string;
  intro: string;
  specialties: string[];
  statLine: {
    label: string;
    value: string;
  }[];
  reviews: AgentReview[];
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertySlug: string;
  status: "New" | "Contacted" | "Tour Booked";
  source: string;
  notes: string;
  createdAt: string;
};

export const stats = [
  { value: "500+", label: "Properties marketed" },
  { value: "12", label: "Years in luxury residential" },
  { value: "98%", label: "List-to-close ratio" },
  { value: "$680M", label: "Closed transaction volume" },
];

export const neighborhoods = [
  {
    name: "Tribeca",
    summary: "Warehouse-scale lofts, river light, and discreet service at every turn.",
  },
  {
    name: "Beverly Hills",
    summary: "Statement estates with cinematic arrival sequences and private resort grounds.",
  },
  {
    name: "Miami Beach",
    summary: "Waterfront living with dock access, sunrise terraces, and hospitality-grade amenities.",
  },
];

export const agents: Agent[] = [
  {
    slug: "olivia-bennett",
    name: "Olivia Bennett",
    title: "Senior Luxury Property Advisor",
    phone: "(212) 555-0148",
    email: "olivia@k2estate.com",
    intro:
      "Olivia leads flagship urban and waterfront marketing for K2 Estate, pairing white-glove client service with data-led positioning.",
    bio: "With more than a decade representing architects, developers, and private sellers, Olivia specializes in properties where design detail drives value. Her campaigns are built around editorial storytelling, targeted search, and polished buyer management, giving each listing the feel of a brand launch rather than a standard market entry.",
    specialties: ["Penthouse strategy", "International buyers", "New development", "Off-market sourcing"],
    statLine: [
      { label: "Active listings", value: "14" },
      { label: "Average days on market", value: "23" },
      { label: "Client satisfaction", value: "4.9/5" },
    ],
    reviews: [
      {
        id: "r1",
        name: "Lauren Kim",
        role: "Seller, Tribeca",
        quote:
          "Olivia structured the launch perfectly. The photography, buyer cadence, and negotiation process felt disciplined from day one.",
      },
      {
        id: "r2",
        name: "David Mercer",
        role: "Buyer, Miami Beach",
        quote:
          "She translated lifestyle goals into a precise shortlist and handled the contract phase with zero friction.",
      },
      {
        id: "r3",
        name: "Anika Shah",
        role: "Developer",
        quote:
          "K2 brought an editorial level of polish to the entire release. Olivia was sharp, calm, and commercially minded throughout.",
      },
    ],
  },
];

export const properties: Property[] = [
  {
    id: "p1",
    slug: "skyline-penthouse-tribeca",
    title: "Skyline Penthouse",
    address: "18 Hubert Street, PH 4A",
    city: "New York",
    state: "NY",
    zip: "10013",
    neighborhood: "Tribeca",
    type: "Penthouse",
    price: 8450000,
    beds: 4,
    baths: 4.5,
    sqft: 3820,
    lotSize: "Private rooftop terrace",
    yearBuilt: 2019,
    status: "Active",
    description:
      "A full-floor penthouse with a gallery-style arrival, oversized steel-framed windows, and a private rooftop lounge overlooking Lower Manhattan.",
    features: [
      "Private keyed elevator access",
      "Outdoor kitchen and plunge spa",
      "Calacatta marble chef's kitchen",
      "Temperature-controlled wine wall",
    ],
    heroLabel: "Manhattan skyline views",
    agentSlug: "olivia-bennett",
    lat: 40.7163,
    lng: -74.0086,
    images: [
      { id: "p1-1", alt: "Living room view", gradient: "linear-gradient(135deg, #0f172a 0%, #0ea5e9 45%, #f8fafc 100%)" },
      { id: "p1-2", alt: "Kitchen detail", gradient: "linear-gradient(135deg, #111827 0%, #334155 35%, #e2e8f0 100%)" },
      { id: "p1-3", alt: "Terrace at dusk", gradient: "linear-gradient(135deg, #020617 0%, #0369a1 40%, #bae6fd 100%)" },
    ],
  },
  {
    id: "p2",
    slug: "harbor-view-residence",
    title: "Harbor View Residence",
    address: "2201 Collins Avenue, Unit 1502",
    city: "Miami Beach",
    state: "FL",
    zip: "33139",
    neighborhood: "South of Fifth",
    type: "Condo",
    price: 5125000,
    beds: 3,
    baths: 3.5,
    sqft: 2675,
    lotSize: "Oceanfront balcony",
    yearBuilt: 2021,
    status: "Active",
    description:
      "Ocean-facing glass walls, a chef-grade kitchen, and hotel-caliber amenities define this refined South of Fifth residence.",
    features: [
      "Direct ocean terrace",
      "Concierge and beach club service",
      "Spa suite with soaking tub",
      "Integrated smart home controls",
    ],
    heroLabel: "Oceanfront service living",
    agentSlug: "olivia-bennett",
    lat: 25.7742,
    lng: -80.1300,
    images: [
      { id: "p2-1", alt: "Balcony view", gradient: "linear-gradient(135deg, #082f49 0%, #0ea5e9 50%, #ecfeff 100%)" },
      { id: "p2-2", alt: "Open plan interior", gradient: "linear-gradient(135deg, #164e63 0%, #475569 42%, #f8fafc 100%)" },
      { id: "p2-3", alt: "Bedroom suite", gradient: "linear-gradient(135deg, #083344 0%, #0284c7 40%, #cffafe 100%)" },
    ],
  },
  {
    id: "p3",
    slug: "crescent-drive-estate",
    title: "Crescent Drive Estate",
    address: "908 Crescent Drive",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    neighborhood: "The Flats",
    type: "Estate",
    price: 13950000,
    beds: 6,
    baths: 7,
    sqft: 7210,
    lotSize: "0.42 acres",
    yearBuilt: 2017,
    status: "Pending",
    description:
      "Set behind gates in the Flats, this estate layers formal symmetry with warm contemporary interiors and a resort-scale rear garden.",
    features: [
      "Motor court and gated entry",
      "Screening room",
      "Guest house and gym pavilion",
      "Infinity-edge pool",
    ],
    heroLabel: "Resort-scale Beverly Hills living",
    agentSlug: "olivia-bennett",
    lat: 34.0736,
    lng: -118.4004,
    images: [
      { id: "p3-1", alt: "Front elevation", gradient: "linear-gradient(135deg, #1f2937 0%, #0ea5e9 35%, #f8fafc 100%)" },
      { id: "p3-2", alt: "Pool terrace", gradient: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 42%, #dbeafe 100%)" },
      { id: "p3-3", alt: "Primary suite", gradient: "linear-gradient(135deg, #111827 0%, #475569 45%, #e5e7eb 100%)" },
    ],
  },
  {
    id: "p4",
    slug: "park-avenue-gallery-home",
    title: "Park Avenue Gallery Home",
    address: "988 Park Avenue, 12C",
    city: "New York",
    state: "NY",
    zip: "10028",
    neighborhood: "Upper East Side",
    type: "Condo",
    price: 6750000,
    beds: 4,
    baths: 4,
    sqft: 3140,
    lotSize: "Corner exposure",
    yearBuilt: 2008,
    status: "Active",
    description:
      "A gallery-ready classic seven reimagined with tailored millwork, formal entertaining rooms, and open eastern light.",
    features: [
      "Custom oak library",
      "Staffed lobby",
      "Formal dining room",
      "Windowed butler's pantry",
    ],
    heroLabel: "Classic proportions, modern finish",
    agentSlug: "olivia-bennett",
    lat: 40.7736,
    lng: -73.9566,
    images: [
      { id: "p4-1", alt: "Reception room", gradient: "linear-gradient(135deg, #1e293b 0%, #64748b 45%, #f8fafc 100%)" },
      { id: "p4-2", alt: "Dining room", gradient: "linear-gradient(135deg, #0f172a 0%, #0ea5e9 40%, #e0f2fe 100%)" },
      { id: "p4-3", alt: "Bedroom suite", gradient: "linear-gradient(135deg, #111827 0%, #374151 42%, #e5e7eb 100%)" },
    ],
  },
  {
    id: "p5",
    slug: "sunset-ridge-villa",
    title: "Sunset Ridge Villa",
    address: "44 Laurel Canyon View",
    city: "Los Angeles",
    state: "CA",
    zip: "90069",
    neighborhood: "Hollywood Hills",
    type: "Villa",
    price: 9280000,
    beds: 5,
    baths: 5.5,
    sqft: 4980,
    lotSize: "0.31 acres",
    yearBuilt: 2022,
    status: "Active",
    description:
      "A sculptural hillside villa with disappearing glass walls, poolside lounge decks, and sweeping canyon-to-ocean sunsets.",
    features: [
      "Glass bridge entry",
      "Wellness room",
      "Infinity pool and fire terrace",
      "Two-car display garage",
    ],
    heroLabel: "Architectural hillside statement",
    agentSlug: "olivia-bennett",
    lat: 34.1022,
    lng: -118.3590,
    images: [
      { id: "p5-1", alt: "Exterior dusk view", gradient: "linear-gradient(135deg, #111827 0%, #2563eb 40%, #dbeafe 100%)" },
      { id: "p5-2", alt: "Pool deck", gradient: "linear-gradient(135deg, #082f49 0%, #0284c7 40%, #e0f2fe 100%)" },
      { id: "p5-3", alt: "Kitchen island", gradient: "linear-gradient(135deg, #1f2937 0%, #334155 45%, #f1f5f9 100%)" },
    ],
  },
  {
    id: "p6",
    slug: "shoreline-townhome",
    title: "Shoreline Townhome",
    address: "12 Harbor Lane",
    city: "Newport Beach",
    state: "CA",
    zip: "92663",
    neighborhood: "Lido Isle",
    type: "Townhome",
    price: 4380000,
    beds: 3,
    baths: 3.5,
    sqft: 2410,
    lotSize: "Private dock slip",
    yearBuilt: 2020,
    status: "Sold",
    description:
      "Modern bayfront townhome with seamless indoor-outdoor entertaining, bespoke cabinetry, and a private dock for weekend departures.",
    features: [
      "Waterfront terrace",
      "European oak flooring",
      "Private boat slip",
      "Rooftop lounge",
    ],
    heroLabel: "Bayfront weekend ease",
    agentSlug: "olivia-bennett",
    lat: 33.6189,
    lng: -117.9298,
    images: [
      { id: "p6-1", alt: "Bay terrace", gradient: "linear-gradient(135deg, #164e63 0%, #0ea5e9 45%, #ecfeff 100%)" },
      { id: "p6-2", alt: "Living room", gradient: "linear-gradient(135deg, #0f172a 0%, #475569 45%, #e2e8f0 100%)" },
      { id: "p6-3", alt: "Roof deck", gradient: "linear-gradient(135deg, #082f49 0%, #0369a1 38%, #bfdbfe 100%)" },
    ],
  },
  {
    id: "p7",
    slug: "museum-district-loft",
    title: "Museum District Loft",
    address: "401 Polk Street, Loft 8",
    city: "Houston",
    state: "TX",
    zip: "77003",
    neighborhood: "Museum District",
    type: "Penthouse",
    price: 2895000,
    beds: 2,
    baths: 2.5,
    sqft: 2190,
    lotSize: "Dual terraces",
    yearBuilt: 2018,
    status: "Active",
    description:
      "An art-forward loft with soaring ceilings, steel-frame windows, and a flexible entertaining plan tailored to collectors.",
    features: [
      "Double-height living room",
      "Private gallery wall lighting",
      "Chef's prep kitchen",
      "Terrace lounge with skyline exposure",
    ],
    heroLabel: "Collector-grade urban loft",
    agentSlug: "olivia-bennett",
    lat: 29.7253,
    lng: -95.3904,
    images: [
      { id: "p7-1", alt: "Main living space", gradient: "linear-gradient(135deg, #111827 0%, #0ea5e9 42%, #f8fafc 100%)" },
      { id: "p7-2", alt: "Art wall and stair", gradient: "linear-gradient(135deg, #1f2937 0%, #64748b 45%, #e2e8f0 100%)" },
      { id: "p7-3", alt: "Terrace seating", gradient: "linear-gradient(135deg, #0f172a 0%, #0284c7 42%, #bae6fd 100%)" },
    ],
  },
  {
    id: "p8",
    slug: "oak-court-residence",
    title: "Oak Court Residence",
    address: "77 Oak Court",
    city: "Austin",
    state: "TX",
    zip: "78703",
    neighborhood: "Tarrytown",
    type: "Estate",
    price: 6190000,
    beds: 5,
    baths: 5,
    sqft: 5320,
    lotSize: "0.53 acres",
    yearBuilt: 2023,
    status: "Active",
    description:
      "Warm limestone, shaded courtyards, and a pavilion-like floor plan create a private family compound minutes from downtown Austin.",
    features: [
      "Detached guest studio",
      "Butler's prep pantry",
      "Covered outdoor dining court",
      "Pool and integrated spa",
    ],
    heroLabel: "Private compound with natural warmth",
    agentSlug: "olivia-bennett",
    lat: 30.3127,
    lng: -97.7723,
    images: [
      { id: "p8-1", alt: "Front courtyard", gradient: "linear-gradient(135deg, #1f2937 0%, #38bdf8 38%, #f8fafc 100%)" },
      { id: "p8-2", alt: "Kitchen and dining", gradient: "linear-gradient(135deg, #292524 0%, #57534e 42%, #fafaf9 100%)" },
      { id: "p8-3", alt: "Pool court", gradient: "linear-gradient(135deg, #082f49 0%, #0ea5e9 42%, #e0f2fe 100%)" },
    ],
  },
];

export const leads: Lead[] = [
  {
    id: "l1",
    name: "Hannah Cooper",
    email: "hannah.cooper@example.com",
    phone: "(917) 555-0102",
    propertySlug: "skyline-penthouse-tribeca",
    status: "New",
    source: "Website form",
    notes: "Requested a private twilight showing next week.",
    createdAt: "2026-03-20",
  },
  {
    id: "l2",
    name: "Marcus Lee",
    email: "marcus.lee@example.com",
    phone: "(310) 555-0184",
    propertySlug: "sunset-ridge-villa",
    status: "Contacted",
    source: "Instagram ad",
    notes: "Considering primary home plus adjacent lot opportunity.",
    createdAt: "2026-03-19",
  },
  {
    id: "l3",
    name: "Sofia Ramirez",
    email: "sofia.ramirez@example.com",
    phone: "(305) 555-0127",
    propertySlug: "harbor-view-residence",
    status: "Tour Booked",
    source: "Referral",
    notes: "In town March 28-30 and wants amenity deck walkthrough.",
    createdAt: "2026-03-18",
  },
  {
    id: "l4",
    name: "Ethan Brooks",
    email: "ethan.brooks@example.com",
    phone: "(512) 555-0193",
    propertySlug: "oak-court-residence",
    status: "New",
    source: "Google search",
    notes: "Interested in school zoning and guest studio use.",
    createdAt: "2026-03-18",
  },
];

export async function getProperties() {
  return properties;
}

export async function getFeaturedProperties() {
  return properties.slice(0, 4);
}

export async function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export async function getAgentBySlug(slug: string) {
  return agents.find((agent) => agent.slug === slug);
}

export async function getAgentListings(slug: string) {
  return properties.filter((property) => property.agentSlug === slug);
}

export async function getSimilarProperties(property: Property) {
  return properties
    .filter(
      (candidate) =>
        candidate.slug !== property.slug &&
        (candidate.neighborhood === property.neighborhood ||
          candidate.type === property.type),
    )
    .slice(0, 3);
}

export async function getLeads() {
  return leads;
}
