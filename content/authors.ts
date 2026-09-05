export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
};

export const authors: Record<string, Author> = {
  "editorial-team": {
    slug: "editorial-team",
    name: "Editorial Team",
    role: "Travel & rental desk",
    bio: "Our editorial desk pairs working rental agents with travel writers to publish guides that reflect how renting a car actually works: pickup logistics, honest pricing and the small decisions that save real money.",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80",
  },
  "maya-torres": {
    slug: "maya-torres",
    name: "Maya Torres",
    role: "Senior travel writer",
    bio: "Maya has covered road trips and airport logistics for a decade, driving rentals through 40-plus states. She writes the guides she wishes she'd had at the counter.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  "daniel-reed": {
    slug: "daniel-reed",
    name: "Daniel Reed",
    role: "Rental operations lead",
    bio: "Daniel spent years behind rental counters before moving to operations. He explains the fine print (insurance, fees, fuel policies) in plain English.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
};

export function getAuthor(slug: string): Author {
  return authors[slug] ?? authors["editorial-team"];
}
