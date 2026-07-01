/**
 * Airport rental data model.
 *
 * Powers the "Popular Airport Car Rentals" homepage section and the dynamic
 * `/airports/[iata]` location pages. Content is intentionally specific to each
 * airport (terminals, pickup logistics, local tips) so every page is unique and
 * genuinely useful rather than templated filler.
 */

export type AirportFaq = { q: string; a: string };
export type NearbyPlace = { name: string; note: string };

export type Airport = {
  iata: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  priceFrom: number;
  image: string;
  gradient: string;
  /** One-line summary for cards. */
  blurb: string;
  /** Opening paragraphs for the location page. */
  intro: string[];
  /** How the rental counter / pickup is laid out at this airport. */
  pickup: string;
  /** Practical, airport-specific rental tips. */
  tips: string[];
  /** Nearby attractions to seed road-trip ideas. */
  nearby: NearbyPlace[];
  faqs: AirportFaq[];
};

export const airports: Airport[] = [
  {
    iata: "LAX",
    slug: "lax",
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    state: "CA",
    priceFrom: 32,
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1400&q=80",
    gradient: "from-orange-600 to-rose-700",
    blurb: "Skip the shuttle chaos — reserve an LAX rental by phone and pick up curbside.",
    intro: [
      "Renting a car at Los Angeles International is the difference between seeing LA and sitting in someone else's schedule. The city sprawls from Santa Monica to Pasadena, and rideshare surge pricing to the beaches or the Valley adds up fast — a rental pays for itself by day two.",
      "LAX moved its rental companies off-airport to the consolidated ConRAC facility, so a quick call before you land means your car and rate are locked in before you ever reach the shuttle. Our agents confirm an all-in price up front, including the airport concession fees most sites bury at checkout.",
    ],
    pickup:
      "All LAX rental brands operate from the new LAX Economy Parking / consolidated rental area reached by the free 'LAX-it' and rental shuttles from the lower (arrivals) level. Tell your agent your terminal and flight, and we'll have the car staged so pickup is a signature and keys.",
    tips: [
      "Book a FasTrak-equipped car if you'll drive the 110 or 405 express lanes — it saves the daily transponder add-on.",
      "Ask for a mid-size or larger if you're heading to the mountains or desert; LA freeways reward comfort over economy on long hauls.",
      "Avoid a 4–7pm pickup or return if you can — LAX traffic and the rental shuttle loop are slowest at rush hour.",
      "Confirm the fuel policy on the call; 'full-to-full' is almost always cheaper than prepaid fuel for city driving.",
    ],
    nearby: [
      { name: "Santa Monica Pier", note: "20 minutes northwest — beaches, the pier and PCH start here." },
      { name: "Hollywood & Griffith Observatory", note: "45 minutes north for the sign, the hills and the skyline view." },
      { name: "Malibu", note: "A 40-minute coastal drive up the Pacific Coast Highway." },
    ],
    faqs: [
      { q: "How do I pick up my rental car at LAX?", a: "Take the free rental shuttle from the arrivals (lower) level to the consolidated rental area. Give us your flight number when you call and the car will be ready — you'll just verify your license and drive out." },
      { q: "Is it cheaper to rent a car at LAX or off-airport?", a: "Off-airport locations sometimes skip the airport concession fee, but the rideshare cost to reach them usually erases the savings. We quote the all-in airport rate so you can compare honestly." },
      { q: "Can I get a same-day rental at LAX?", a: "Yes. Call our line and, subject to availability, we can arrange same-day pickup at LAX — useful for delayed flights or last-minute plans." },
    ],
  },
  {
    iata: "JFK",
    slug: "jfk",
    name: "John F. Kennedy International Airport",
    city: "New York",
    state: "NY",
    priceFrom: 39,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=80",
    gradient: "from-slate-800 to-slate-950",
    blurb: "A JFK rental makes Long Island, the Hamptons and upstate easy — call to reserve.",
    intro: [
      "Manhattan doesn't need a car, but everything around it does. A rental from JFK opens up Long Island beaches, the Hamptons, Westchester and the drive north to the Hudson Valley without wrestling the LIRR with luggage.",
      "JFK's rental facilities sit just outside the terminals on the AirTrain line. One phone call locks your rate before you land, and our agents flag the tolls and congestion pricing you'll want to plan around before you point the car toward the bridges.",
    ],
    pickup:
      "Most JFK rental locations are reached via the free AirTrain from your terminal to the Federal Circle station, where the rental center and shuttles are located. Share your terminal and arrival time and we'll have paperwork ready.",
    tips: [
      "Get an E-ZPass-enabled vehicle — JFK-area bridges, tunnels and the new Manhattan congestion charge are cashless.",
      "If you're staying in Manhattan first, consider picking the car up the day you leave the city to skip garage fees that can top $50/night.",
      "Ask about unlimited mileage if you're heading to the Hamptons or upstate — day trips add up quickly.",
      "Winter travelers should confirm all-season or winter tires for drives north of the city.",
    ],
    nearby: [
      { name: "The Hamptons", note: "About 90 minutes east along the Montauk Highway for beaches and villages." },
      { name: "Hudson Valley", note: "An hour-plus north for Storm King, wineries and fall foliage." },
      { name: "Long Island beaches", note: "Jones Beach and Robert Moses are 30–45 minutes away." },
    ],
    faqs: [
      { q: "Do I need a car if I'm staying in Manhattan?", a: "Not for Manhattan itself — parking is expensive and transit is excellent. A JFK rental makes sense when you're exploring Long Island, the Hamptons, or driving upstate. Many travelers rent only for the out-of-city portion of their trip." },
      { q: "Are tolls included in my JFK rental?", a: "Tolls are separate, and the New York area is largely cashless. We'll recommend an E-ZPass-equipped vehicle and explain the toll and congestion-pricing options when you call." },
      { q: "How far is the rental center from the JFK terminals?", a: "Rental facilities are a short, free AirTrain ride from every terminal to the Federal Circle station. Plan about 10–15 minutes from gate to counter." },
    ],
  },
  {
    iata: "MCO",
    slug: "mco",
    name: "Orlando International Airport",
    city: "Orlando",
    state: "FL",
    priceFrom: 28,
    image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?auto=format&fit=crop&w=1400&q=80",
    gradient: "from-teal-500 to-emerald-700",
    blurb: "Theme-park trips run on wheels — grab an MCO rental with room for the whole crew.",
    intro: [
      "Orlando is a driving town. Between the theme parks, the outlet malls and the day trip to the coast, families burn through rideshare budgets in a single afternoon — an MCO rental is almost always the cheaper, saner choice.",
      "One of the things travelers love about Orlando International is that the major rental counters are right inside the terminal, so there's no shuttle after a long flight. Call ahead and we'll have a car sized for your group and your stroller pile ready to roll.",
    ],
    pickup:
      "Rental counters at MCO are located on Level 1 of both Terminal A and Terminal B — no off-site shuttle required. Tell your agent which terminal your airline uses and your car will be waiting in the adjacent garage.",
    tips: [
      "Size up to an SUV or minivan if you're carrying strollers, car seats and park gear — the trunk space matters more than the daily rate here.",
      "Ask about toll transponders: the 417, 429 and 528 (Beachline) toll roads ring the parks and are largely cashless.",
      "Reserve a car seat on the call if you're traveling with little ones rather than lugging your own through the airport.",
      "Fill up before you return — gas near MCO is pricey, and prepaid fuel rarely pays off for short park trips.",
    ],
    nearby: [
      { name: "Walt Disney World", note: "About 25 minutes southwest via the 417." },
      { name: "Universal Orlando", note: "20 minutes from the airport on I-4." },
      { name: "Cocoa Beach & the coast", note: "A 45-minute drive east on the 528." },
    ],
    faqs: [
      { q: "What size car should I rent for a theme-park trip?", a: "For a family of four with strollers and park gear, a mid-size SUV or minivan is the sweet spot. Tell us your group size and luggage on the call and we'll match you to the right vehicle." },
      { q: "Do I need a toll pass in Orlando?", a: "The expressways around the parks are largely cashless, so a transponder-equipped car saves hassle. We'll explain the toll options and pricing when you book." },
      { q: "Are MCO rentals available inside the terminal?", a: "Yes — Orlando International's rental counters are inside the terminal on Level 1, so there's no shuttle after your flight. It's one of the easiest big airports for pickup." },
    ],
  },
  {
    iata: "MIA",
    slug: "mia",
    name: "Miami International Airport",
    city: "Miami",
    state: "FL",
    priceFrom: 30,
    image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=1400&q=80",
    gradient: "from-cyan-500 to-blue-700",
    blurb: "South Beach, the Keys and the Everglades — a MIA rental unlocks all of it.",
    intro: [
      "Miami rewards drivers. South Beach, Coral Gables, Wynwood and the long causeways between them are spread out, and the drive to the Keys is a bucket-list trip in itself. A rental from MIA turns a beach vacation into a whole region.",
      "Miami International connects to its rental center by an automated train, so pickup is quick even at peak season. Call before you land and our agents will confirm a clear rate and flag the bridge tolls you'll meet on the way to the beach.",
    ],
    pickup:
      "MIA rentals are handled at the Miami Intermodal Center (MIC), reached by the free MIA Mover train from the terminal's third level. It's a five-minute ride to a single building housing every major brand.",
    tips: [
      "Get a convertible or a comfortable mid-size for the Overseas Highway to Key West — it's a three-hour drive worth savoring.",
      "SunPass toll roads (like the 836 and 112) are cashless; ask for a transponder-equipped car.",
      "Parking in South Beach is tight and metered — budget for garages and confirm your hotel's rate.",
      "Summer means afternoon storms; all-wheel drive isn't needed, but good wipers and headlights are.",
    ],
    nearby: [
      { name: "Key West & the Florida Keys", note: "A scenic 3–3.5 hour drive south on the Overseas Highway." },
      { name: "Everglades National Park", note: "About an hour southwest for airboats and wildlife." },
      { name: "Fort Lauderdale", note: "40 minutes north for a quieter beach day." },
    ],
    faqs: [
      { q: "Can I drive to Key West from Miami airport?", a: "Yes — it's one of America's great drives, roughly three hours south on the Overseas Highway. A comfortable mid-size or a convertible makes the trip. Confirm unlimited mileage when you call." },
      { q: "How do I get to the MIA rental center?", a: "Take the free MIA Mover train from the terminal's third level to the Miami Intermodal Center, where all rental brands are located. It's about a five-minute ride." },
      { q: "Are there tolls around Miami?", a: "Several Miami expressways are cashless SunPass roads. We'll set you up with a transponder-equipped vehicle and explain the charges before you drive." },
    ],
  },
  {
    iata: "LAS",
    slug: "las",
    name: "Harry Reid International Airport",
    city: "Las Vegas",
    state: "NV",
    priceFrom: 27,
    image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1400&q=80",
    gradient: "from-amber-500 to-red-700",
    blurb: "The Strip is only the start — a LAS rental gets you to Zion, the Grand Canyon and beyond.",
    intro: [
      "You can walk the Strip, but the best of Las Vegas is often a drive away — Red Rock Canyon at sunrise, the Hoover Dam, or the longer haul to Zion and the Grand Canyon. A rental from Harry Reid International turns a weekend into a Southwest road trip.",
      "LAS keeps all its rental brands in one consolidated center a short shuttle from the terminals. One call locks your rate, and our agents will right-size the car for desert highways where a little extra comfort and horsepower goes a long way.",
    ],
    pickup:
      "All LAS rentals operate from the McCarran Rent-A-Car Center about three miles from the terminals, served by free, frequent shuttles from the arrivals level of Terminals 1 and 3.",
    tips: [
      "Size up for desert road trips — Zion and the Grand Canyon are long, hot drives where a mid-size or SUV is worth it.",
      "Start canyon drives early; summer afternoons routinely top 105°F and cars (and drivers) prefer the morning.",
      "Confirm unlimited mileage — the Grand Canyon's South Rim is a 4.5-hour drive each way.",
      "Keep water in the car and watch your fuel on remote stretches between Vegas and the parks.",
    ],
    nearby: [
      { name: "Red Rock Canyon", note: "A 30-minute drive west for a scenic loop and hiking." },
      { name: "Hoover Dam", note: "45 minutes southeast, easy to pair with Lake Mead." },
      { name: "Zion National Park", note: "About 2.5 hours northeast into Utah." },
    ],
    faqs: [
      { q: "Do I need a rental car in Las Vegas?", a: "Not for the Strip itself, but you'll want one for Red Rock Canyon, Hoover Dam, or day trips to Zion and the Grand Canyon. Many visitors rent for the road-trip days and rely on walking or rideshare on the Strip." },
      { q: "How far is the LAS rental center from the airport?", a: "The consolidated rental center is about three miles away, with free shuttles running frequently from the arrivals level. Plan roughly 15 minutes." },
      { q: "What car is best for a Grand Canyon day trip?", a: "A comfortable mid-size or SUV with unlimited mileage — the South Rim is a 4.5-hour drive each way through the desert. We'll recommend the right fit on the call." },
    ],
  },
  {
    iata: "DFW",
    slug: "dfw",
    name: "Dallas Fort Worth International Airport",
    city: "Dallas",
    state: "TX",
    priceFrom: 29,
    image: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?auto=format&fit=crop&w=1400&q=80",
    gradient: "from-indigo-600 to-violet-800",
    blurb: "Everything's bigger in Texas — including the distances. A DFW rental is essential.",
    intro: [
      "The Dallas–Fort Worth metroplex is enormous and built for cars. Between downtown Dallas, Fort Worth's Stockyards, the Arts District and the suburbs, transit won't get you far — a rental from DFW is less a convenience than a necessity.",
      "DFW is one of the world's largest airports, and its rental center consolidates every brand in one building on a quick shuttle. Call ahead and our agents confirm your rate and the tollway options before you tackle the metroplex freeways.",
    ],
    pickup:
      "DFW rentals are handled at the Rental Car Center south of the terminals, reached by a free, dedicated shuttle that runs continuously from the lower level of every terminal.",
    tips: [
      "Get a TollTag-equipped car — the metroplex leans heavily on cashless tollways like the DNT and 121.",
      "Distances are deceptive; a 'quick' hop between Dallas and Fort Worth is a 40-minute freeway drive.",
      "Summers are hot — confirm the A/C and consider a car with good sun protection for kids.",
      "If you're flying in and out of DFW, note the terminal-to-rental shuttle can add 20 minutes at return; leave a buffer.",
    ],
    nearby: [
      { name: "Fort Worth Stockyards", note: "35 minutes west for cattle drives and Texas history." },
      { name: "Downtown Dallas", note: "25 minutes east for the Arts District and Dealey Plaza." },
      { name: "Waco", note: "About 90 minutes south — an easy day trip." },
    ],
    faqs: [
      { q: "Is DFW or Dallas Love Field better for rentals?", a: "DFW has the largest selection and a consolidated rental center; Love Field is smaller and closer to downtown. If you're comparing rates and vehicle choice, DFW usually wins. Call us and we'll quote both if it helps." },
      { q: "Do I need a toll tag in Dallas?", a: "The metroplex uses cashless tollways extensively, so a TollTag-equipped rental avoids invoices and surcharges. We'll set that up and explain the charges when you book." },
      { q: "How long does DFW rental pickup take?", a: "Plan about 15–20 minutes from terminal to wheel including the free shuttle to the Rental Car Center. Give us your flight and the car will be staged and ready." },
    ],
  },
  {
    iata: "ATL",
    slug: "atl",
    name: "Hartsfield–Jackson Atlanta International Airport",
    city: "Atlanta",
    state: "GA",
    priceFrom: 28,
    image: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=1400&q=80",
    gradient: "from-emerald-600 to-teal-800",
    blurb: "The world's busiest airport pairs with a rental for easy Southeast road trips.",
    intro: [
      "Atlanta is the gateway to the Southeast, and the world's busiest airport makes it the natural launch point for road trips to the mountains, the coast or Nashville. In-town, Atlanta's neighborhoods sprawl and MARTA only reaches so far — a rental fills the gaps.",
      "ATL keeps its rental brands in a single center connected to the terminal by an automated people mover, so even at peak volume pickup stays smooth. One call locks your rate and gets a car sized for your trip.",
    ],
    pickup:
      "ATL rentals operate from the Rental Car Center, connected to the domestic terminal by the free ATL SkyTrain — a short, step-free ride that avoids road traffic entirely.",
    tips: [
      "Use the SkyTrain rather than a rideshare between the terminal and rental center; it's faster and free.",
      "Peach Pass toll lanes on I-85 and I-75 are optional but handy in rush hour — ask if your car is equipped.",
      "Atlanta traffic is serious; avoid 4–7pm departures from the airport if you can.",
      "Heading to the mountains? A mid-size or SUV handles the North Georgia switchbacks comfortably.",
    ],
    nearby: [
      { name: "Blue Ridge & North Georgia mountains", note: "About 90 minutes north for hiking and cabins." },
      { name: "Savannah", note: "A 3.5-hour drive southeast to the coast." },
      { name: "Stone Mountain", note: "35 minutes east for the park and skyline views." },
    ],
    faqs: [
      { q: "How do I get to the rental center at ATL?", a: "Take the free ATL SkyTrain from the domestic terminal directly to the Rental Car Center. It's a short, step-free ride that skips airport road traffic." },
      { q: "Is a rental car worth it in Atlanta?", a: "In-town, MARTA covers the airport-to-downtown corridor, but Atlanta's neighborhoods and suburbs sprawl well beyond it. For anything beyond the core — or a Southeast road trip — a rental pays off." },
      { q: "Can I do a same-day rental at ATL?", a: "Yes, subject to availability. Call our line with your timing and we'll arrange same-day pickup at Hartsfield–Jackson where inventory allows." },
    ],
  },
  {
    iata: "ORD",
    slug: "ord",
    name: "O'Hare International Airport",
    city: "Chicago",
    state: "IL",
    priceFrom: 31,
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1400&q=80",
    gradient: "from-blue-700 to-indigo-900",
    blurb: "From the Loop to the Dunes and Lake Geneva — an ORD rental widens the map.",
    intro: [
      "Downtown Chicago runs on the 'L', but the region rewards a car: the Indiana Dunes, Lake Geneva, Milwaukee and the long Lake Michigan shoreline are all easy drives. A rental from O'Hare turns a city break into a Midwest tour.",
      "O'Hare connects to its consolidated rental facility by the free Airport Transit System train, so pickup is quick despite the airport's size. Call ahead to lock your rate and get a car ready for Chicago winters or summer road trips.",
    ],
    pickup:
      "ORD rentals are at the Multi-Modal Facility, reached by the free Airport Transit System (ATS) train from all terminals — a step-free ride that avoids the terminal roadways.",
    tips: [
      "Winter travelers: confirm all-season or winter tires and factor extra time for de-icing and snow.",
      "I-PASS toll roads ring the metro; a transponder-equipped car avoids mailed invoices.",
      "Downtown parking and hotel garages are pricey — consider renting only for out-of-city days.",
      "The ATS train is faster than a rideshare between the terminals and the rental facility; use it.",
    ],
    nearby: [
      { name: "Indiana Dunes National Park", note: "About an hour southeast along Lake Michigan." },
      { name: "Lake Geneva, WI", note: "90 minutes north for the lakeside resort towns." },
      { name: "Milwaukee", note: "A 90-minute drive north for museums and the lakefront." },
    ],
    faqs: [
      { q: "Do I need a car in Chicago?", a: "The 'L' and Metra cover the city and airport well, so many visitors skip a car downtown. A rental shines for day trips — the Dunes, Lake Geneva, Milwaukee — or if you're staying in the suburbs." },
      { q: "How do I reach the ORD rental center?", a: "Ride the free Airport Transit System (ATS) train from any terminal to the Multi-Modal Facility. It's step-free and faster than driving between the terminals." },
      { q: "Are winter rentals at O'Hare equipped for snow?", a: "Our agents will confirm all-season or winter tires for cold-weather travel and remind you to budget time for de-icing. Just mention your dates when you call." },
    ],
  },
];

export function getAirport(iata: string): Airport | undefined {
  const key = iata.toLowerCase();
  return airports.find((a) => a.slug === key);
}
