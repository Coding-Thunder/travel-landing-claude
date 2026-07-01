/**
 * Vehicle category data model.
 *
 * Powers the homepage "Vehicle Categories" section and the dynamic
 * `/vehicles/[slug]` pages. Each category carries its own use-cases, popular
 * models, indicative pricing and FAQs so every page stands on its own.
 */

export type VehicleModel = { name: string; note: string };
export type VehiclePricing = { term: string; price: string; note: string };
export type VehicleFaq = { q: string; a: string };

export type VehicleCategory = {
  slug: string;
  name: string;
  priceFrom: number;
  seats: number;
  bags: number;
  transmission: string;
  image: string;
  gradient: string;
  blurb: string;
  intro: string[];
  bestFor: string[];
  models: VehicleModel[];
  pricing: VehiclePricing[];
  tips: string[];
  faqs: VehicleFaq[];
};

export const vehicleCategories: VehicleCategory[] = [
  {
    slug: "economy",
    name: "Economy",
    priceFrom: 28,
    seats: 5,
    bags: 2,
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-sky-500 to-blue-600",
    blurb: "The cheapest way to get where you're going — light on gas, easy to park.",
    intro: [
      "Economy cars are the default for a reason: they're the least expensive to rent, the cheapest to fuel, and the simplest to park in a crowded city or a tight airport garage. For solo travelers and couples with a couple of bags, they hit the sweet spot of price and practicality.",
      "Don't mistake 'economy' for 'bare-bones.' Today's economy fleet comes with automatic transmissions, Bluetooth, backup cameras and 35+ MPG, so a week of errands or a city break costs a fraction of a larger class without feeling like a penalty box.",
    ],
    bestFor: [
      "Solo travelers and couples on a budget",
      "City breaks where parking is tight",
      "Short business trips with carry-on luggage",
      "Anyone maximizing miles per gallon",
    ],
    models: [
      { name: "Toyota Corolla", note: "Reliable, comfortable and famously fuel-efficient." },
      { name: "Nissan Versa", note: "Surprising rear legroom for the class." },
      { name: "Kia Rio", note: "Easy to drive with modern tech built in." },
    ],
    pricing: [
      { term: "Daily", price: "from $28/day", note: "Great for quick trips and errands." },
      { term: "Weekly", price: "from $175/week", note: "The weekly rate usually beats seven daily ones." },
      { term: "Monthly", price: "from $620/month", note: "Ask about long-term discounts by phone." },
    ],
    tips: [
      "Book economy early — it's the first class to sell out at busy airports.",
      "If you'll have three or more passengers plus luggage, size up to compact or mid-size for comfort.",
      "Confirm the fuel policy; full-to-full is almost always cheaper than prepaid on a small tank.",
      "Ask about unlimited mileage if you're planning any day trips.",
    ],
    faqs: [
      { q: "How many bags fit in an economy rental?", a: "Most economy cars hold two large suitcases plus a couple of carry-ons. If you're close to the limit, ask your agent — a compact or mid-size adds real trunk space for only a little more." },
      { q: "Is an economy car good for highway driving?", a: "Yes. Modern economy cars cruise comfortably at highway speeds and return excellent mileage. For long multi-hour drives with passengers, a mid-size adds comfort, but economy is perfectly capable." },
      { q: "Why is economy sometimes unavailable?", a: "Economy is the most-requested class, so it sells out first at busy airports. Booking ahead by phone locks in both the car and the rate." },
    ],
  },
  {
    slug: "compact",
    name: "Compact",
    priceFrom: 32,
    seats: 5,
    bags: 3,
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-cyan-500 to-sky-600",
    blurb: "A little more room and comfort than economy, still easy on the wallet.",
    intro: [
      "Compact cars are the practical upgrade from economy: a touch more trunk, a bit more back-seat room, and a more planted feel on the highway, all for a few dollars more a day. For most trips, this is the class that quietly does everything you need.",
      "They stay nimble in traffic and simple to park while adding enough space for a third passenger or an extra bag. If you can't decide between saving money and staying comfortable, compact is the answer.",
    ],
    bestFor: [
      "Small families and groups of three",
      "Mixed city-and-highway itineraries",
      "Travelers who want comfort without an SUV price",
      "Weekend getaways with moderate luggage",
    ],
    models: [
      { name: "Honda Civic", note: "Refined, efficient and genuinely fun to drive." },
      { name: "Toyota Corolla Hatchback", note: "Extra cargo flexibility with the seats down." },
      { name: "Hyundai Elantra", note: "Roomy cabin and a long feature list." },
    ],
    pricing: [
      { term: "Daily", price: "from $32/day", note: "A small step up from economy for real comfort." },
      { term: "Weekly", price: "from $199/week", note: "Popular for week-long city trips." },
      { term: "Monthly", price: "from $690/month", note: "Long-term rates available on request." },
    ],
    tips: [
      "Compact is the value pick when you want more room but not an SUV's fuel bill.",
      "Great for hilly or mountainous city drives where a small footprint helps.",
      "Ask about a hatchback variant if you need flexible cargo space.",
      "For four adults on a long trip, consider mid-size instead.",
    ],
    faqs: [
      { q: "What's the difference between economy and compact?", a: "Compact cars are slightly larger, with a bit more trunk and rear-seat room and a more stable highway ride. Economy is cheaper and easier to park; compact is the comfort upgrade for a few dollars more." },
      { q: "Can a compact fit a car seat?", a: "Yes, a compact comfortably fits one car seat with room for passengers. For two car seats plus luggage, a mid-size or SUV is more comfortable. Reserve a child seat on the call if you need one." },
      { q: "Is a compact good for a road trip?", a: "Absolutely — compacts are efficient and comfortable for two to three people on a road trip. For four adults with luggage over several days, size up to mid-size or full-size." },
    ],
  },
  {
    slug: "mid-size",
    name: "Mid-size",
    priceFrom: 37,
    seats: 5,
    bags: 3,
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600 to-indigo-700",
    blurb: "The all-rounder: room for four adults, comfortable for long drives.",
    intro: [
      "Mid-size sedans are the Goldilocks class — big enough for four adults and a weekend's worth of luggage, small enough to stay efficient and easy to handle. It's the class business travelers and small families reach for when comfort matters but an SUV is overkill.",
      "Expect a quiet highway ride, cruise control, ample trunk space and enough rear legroom that nobody draws the short straw. For multi-day trips with passengers, the mid-size earns its keep.",
    ],
    bestFor: [
      "Four adults traveling together",
      "Business travel and airport runs in comfort",
      "Multi-day road trips",
      "Families who don't need an SUV",
    ],
    models: [
      { name: "Toyota Camry", note: "Smooth, spacious and dependable." },
      { name: "Honda Accord", note: "Big trunk and a premium-feeling cabin." },
      { name: "Nissan Altima", note: "Comfortable ride with available all-wheel drive." },
    ],
    pricing: [
      { term: "Daily", price: "from $37/day", note: "Comfort for four without SUV running costs." },
      { term: "Weekly", price: "from $235/week", note: "A favorite for week-long family trips." },
      { term: "Monthly", price: "from $790/month", note: "Corporate and long-term rates by phone." },
    ],
    tips: [
      "Best value when you have four passengers and want highway comfort.",
      "Trunks easily swallow multiple large suitcases — ideal for airport pickups.",
      "Ask about all-wheel-drive variants for winter or mountain travel.",
      "For five-plus passengers or lots of gear, move up to an SUV or minivan.",
    ],
    faqs: [
      { q: "How many people fit comfortably in a mid-size?", a: "A mid-size seats five, and unlike smaller classes it's genuinely comfortable for four adults on a long drive. Five adults fit for shorter trips; for five with luggage, consider an SUV." },
      { q: "Is a mid-size good for business travel?", a: "It's the classic business-travel class — quiet, comfortable, with a big trunk for roller bags and a professional look for client pickups. Many corporate travelers default to mid-size." },
      { q: "Mid-size vs SUV — which should I pick?", a: "Choose mid-size for comfort and efficiency with up to four passengers; choose an SUV for extra cargo, higher seating, all-weather capability or five-plus passengers. Our agents will help you decide on the call." },
    ],
  },
  {
    slug: "full-size",
    name: "Full-size",
    priceFrom: 43,
    seats: 5,
    bags: 4,
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-slate-700 to-slate-900",
    blurb: "Maximum sedan space and comfort for passengers, luggage and long miles.",
    intro: [
      "Full-size sedans are about space and serenity: a large trunk that shrugs off a family's luggage, generous rear legroom, and a settled, quiet ride that turns long interstate stretches into easy miles. When comfort is the priority, this is the sedan to book.",
      "They're a favorite for airport transfers with luggage, longer road trips, and anyone who simply wants to stretch out. You get SUV-like comfort and trunk space while keeping a car's efficiency and easy handling.",
    ],
    bestFor: [
      "Long-distance road trips with luggage",
      "Airport transfers for four or five with bags",
      "Taller drivers who want more room",
      "Comfort-first travelers",
    ],
    models: [
      { name: "Chrysler 300", note: "Big, comfortable and quietly upscale." },
      { name: "Toyota Avalon", note: "Limousine-like rear seat and a huge trunk." },
      { name: "Nissan Maxima", note: "Sporty feel with full-size room." },
    ],
    pricing: [
      { term: "Daily", price: "from $43/day", note: "Space and comfort for the whole crew." },
      { term: "Weekly", price: "from $275/week", note: "Ideal for week-long road trips." },
      { term: "Monthly", price: "from $890/month", note: "Ask about extended-rental pricing." },
    ],
    tips: [
      "The big trunk makes full-size the easy pick for airport pickups with checked bags.",
      "Choose full-size over an SUV when you want comfort and efficiency over cargo height.",
      "Great for tall drivers — front and rear legroom is generous.",
      "For seven passengers, step up to a minivan instead.",
    ],
    faqs: [
      { q: "How much luggage fits in a full-size?", a: "A full-size trunk typically holds four large suitcases plus carry-ons — enough for a family of four's checked bags. It's one of the most luggage-friendly car classes short of an SUV or minivan." },
      { q: "Is a full-size worth the extra cost?", a: "If you're driving long distances, carrying luggage for four or five, or you're a taller driver, the added space and comfort are well worth it. For short city trips, a smaller class saves money." },
      { q: "Full-size sedan or SUV for a road trip?", a: "A full-size sedan rides comfortably and uses less fuel; an SUV adds cargo height, ground clearance and all-weather traction. For pavement road trips with luggage, the sedan is often the better value." },
    ],
  },
  {
    slug: "suv",
    name: "SUV",
    priceFrom: 49,
    seats: 5,
    bags: 4,
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-700 to-indigo-800",
    blurb: "Space, higher seating and all-weather capability for families and gear.",
    intro: [
      "SUVs are the family and adventure workhorse: elevated seating for better visibility, generous cargo for strollers, coolers and gear, and available all-wheel drive for snow, sand or mountain roads. When the trip involves people and stuff, an SUV earns its rate.",
      "From compact crossovers to three-row haulers, the class scales to your group. It's the default choice for ski trips, national-park road trips and theme-park vacations where cargo space and confidence matter.",
    ],
    bestFor: [
      "Families with strollers, gear or sports equipment",
      "Winter, mountain or light off-road driving",
      "Theme-park and national-park road trips",
      "Groups wanting higher seating and visibility",
    ],
    models: [
      { name: "Toyota RAV4", note: "Efficient, roomy and available with all-wheel drive." },
      { name: "Jeep Grand Cherokee", note: "Capable and comfortable for longer hauls." },
      { name: "Chevrolet Tahoe", note: "Full-size, three-row space for big groups." },
    ],
    pricing: [
      { term: "Daily", price: "from $49/day", note: "Compact-crossover starting rate." },
      { term: "Weekly", price: "from $315/week", note: "Popular for family vacations." },
      { term: "Monthly", price: "from $1,050/month", note: "Long-term SUV rates by phone." },
    ],
    tips: [
      "Confirm two-row vs three-row seating — 'SUV' spans compact crossovers to full-size haulers.",
      "Ask specifically for all-wheel drive if you'll face snow or unpaved roads.",
      "SUVs use more fuel; if you don't need the cargo or traction, a mid-size saves money.",
      "Reserve early around ski season and school holidays — SUVs sell out fast.",
    ],
    faqs: [
      { q: "Do all SUV rentals have all-wheel drive?", a: "No — many SUVs are front-wheel drive by default. If you need AWD or 4WD for snow or unpaved roads, tell your agent when you call and we'll confirm a properly equipped vehicle." },
      { q: "How many people fit in an SUV rental?", a: "Compact and mid-size SUVs seat five; full-size, three-row SUVs seat seven or eight. Let us know your group size and cargo and we'll match the right SUV." },
      { q: "SUV or minivan for a big family?", a: "A three-row SUV offers ground clearance and a rugged feel; a minivan offers easier access, sliding doors and the most usable interior space. For pure people-and-luggage capacity, minivans often win." },
    ],
  },
  {
    slug: "luxury",
    name: "Luxury",
    priceFrom: 89,
    seats: 5,
    bags: 4,
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-slate-800 to-slate-950",
    blurb: "Premium badges, richer materials and a first-class drive when it matters.",
    intro: [
      "A luxury rental turns the drive into part of the experience: supple leather, quiet cabins, powerful engines and the kind of technology that makes long trips effortless. Whether it's a special occasion, an important client pickup or simply treating yourself, this class delivers.",
      "Beyond the badge, luxury cars bring advanced driver assistance, premium audio and refined ride quality. It's the difference between getting there and arriving.",
    ],
    bestFor: [
      "Weddings, anniversaries and special occasions",
      "Executive and client-facing business travel",
      "Weekend escapes where the drive is the point",
      "Anyone who wants premium comfort and tech",
    ],
    models: [
      { name: "BMW 5 Series", note: "Athletic, refined and packed with tech." },
      { name: "Mercedes-Benz E-Class", note: "The benchmark for quiet, cosseting comfort." },
      { name: "Audi A6", note: "Understated design with a beautiful interior." },
    ],
    pricing: [
      { term: "Daily", price: "from $89/day", note: "Premium sedans and coupes." },
      { term: "Weekly", price: "from $575/week", note: "Special-occasion and executive travel." },
      { term: "Monthly", price: "from $2,200/month", note: "Executive long-term rates by phone." },
    ],
    tips: [
      "Book luxury well ahead — inventory is limited and specific models sell out.",
      "Ask about the exact model and trim; 'luxury' covers a wide range.",
      "Many luxury cars require a credit card (not debit) and a higher minimum age.",
      "Confirm insurance and protection options — premium vehicles carry higher coverage.",
    ],
    faqs: [
      { q: "Can I request a specific luxury model?", a: "You can request a preferred make and model and we'll do our best to confirm it, though guaranteed-model bookings depend on availability. Call and we'll tell you exactly what's available for your dates." },
      { q: "Do luxury rentals need a credit card?", a: "Most luxury rentals require a major credit card in the renter's name (not a debit card) and may have a higher minimum driver age. We'll confirm the exact requirements when you book." },
      { q: "Is insurance different for luxury cars?", a: "Premium vehicles carry higher protection costs and coverage requirements. Our agents will walk you through the options so there are no surprises at pickup." },
    ],
  },
  {
    slug: "minivan",
    name: "Minivan",
    priceFrom: 69,
    seats: 7,
    bags: 5,
    transmission: "Automatic",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-violet-500 to-purple-700",
    blurb: "Seven or eight seats, sliding doors and the most usable space of any class.",
    intro: [
      "For groups and big families, nothing beats a minivan. Seven or eight seats, sliding doors that make parking-lot loading painless, and a flat, cavernous cargo area that swallows luggage, strollers and coolers with room to spare. It's the most practical vehicle you can rent.",
      "Modern minivans are also genuinely comfortable, with rear entertainment, multiple climate zones and clever stow-away seats. For a multi-generational trip or a team on the road, it's the obvious choice.",
    ],
    bestFor: [
      "Large or multi-generational families",
      "Groups of six to eight traveling together",
      "Theme-park and airport trips with lots of gear",
      "Anyone who needs maximum interior space",
    ],
    models: [
      { name: "Chrysler Pacifica", note: "Comfortable, feature-rich and easy to drive." },
      { name: "Honda Odyssey", note: "Clever seating and huge cargo flexibility." },
      { name: "Toyota Sienna", note: "Efficient hybrid option with available AWD." },
    ],
    pricing: [
      { term: "Daily", price: "from $69/day", note: "Seven-plus seats for the whole group." },
      { term: "Weekly", price: "from $445/week", note: "A favorite for family vacations." },
      { term: "Monthly", price: "from $1,450/month", note: "Long-term group rates by phone." },
    ],
    tips: [
      "Reserve early for holidays and summer — minivans are limited and popular.",
      "Sliding doors make car-seat loading far easier than an SUV in tight spaces.",
      "Ask about built-in versus rental car seats if you're traveling with little ones.",
      "Fold-flat seats mean you can prioritize passengers or cargo trip by trip.",
    ],
    faqs: [
      { q: "How many people fit in a minivan rental?", a: "Most minivans seat seven, and some seat eight. With all seats up they still offer solid cargo space, and folding the rear seats creates a huge flat load area." },
      { q: "Are car seats easy to install in a minivan?", a: "Yes — sliding doors and a tall roofline make minivans the easiest class for installing and accessing car seats, especially in tight parking lots. Reserve seats on the call if you need them." },
      { q: "Minivan or full-size SUV?", a: "Minivans offer more usable interior space, easier access and better fuel economy; full-size SUVs offer ground clearance, towing and a rugged feel. For pure people-and-luggage capacity, the minivan usually wins." },
    ],
  },
];

export function getVehicleCategory(slug: string): VehicleCategory | undefined {
  const key = slug.toLowerCase();
  return vehicleCategories.find((v) => v.slug === key);
}
