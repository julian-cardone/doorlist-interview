// seeds for picsum photos to generate different images
const SEEDS = [
  "ev3",
  "ev4",
  "ev5",
  "ev6",
  "ev7",
  "ev8",
  "ev9",
  "ev10",
  "ev13",
  "ev14",
];
export const SAMPLE_PHOTOS = [
  { id: 0, url: "/cover-default.png" },
  ...SEEDS.map((seed, i) => ({
    id: i + 1,
    url: `https://picsum.photos/seed/${seed}/400`,
  })),
];

export const REACTION_EMOJIS = [
  "",
  "❤️",
  "🎉",
  "🔥",
  "✨",
  "✔️",
  "👀",
  "💀",
  "😁",
];

// gradients for host avatars
export const GRADIENTS = [
  "linear-gradient(135deg, #f472b6, #fb923c)",
  "linear-gradient(135deg, #34d399, #60a5fa)",
  "linear-gradient(135deg, #c084fc, #818cf8)",
  "linear-gradient(135deg, #fb923c, #f59e0b)",
  "linear-gradient(135deg, #60a5fa, #818cf8)",
];

type Photo = {
  id: string;
  src: string;
  alt: string;
};

export const PHOTO_SETS: Record<string, Photo[]> = {
  Featured: genPhotos("feat", 16),
  Gifs: genPhotos("gif", 16),
  Party: genPhotos("party", 16),
  Meme: genPhotos("meme", 16),
  "Greek Life": genPhotos("greek", 16),
};

function genPhotos(prefix: string, count: number): Photo[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index}`,
    src: `https://picsum.photos/seed/${prefix}${index + 1}/300/300`,
    alt: "Event cover option",
  }));
}
