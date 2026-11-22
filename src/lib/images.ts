const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const homeImages = {
  hero: unsplash("1591604466107-ec97de577aff", 2000),
  introMain: unsplash("1606216794074-735e91aa2c92", 1200),
  introDetail: unsplash("1520854221256-17451cc331bf", 700),
  cta: unsplash("1519741497674-611481863552", 2000),
  categories: {
    photography: unsplash("1465495976277-4387d4b0b4c6", 900),
    venues: unsplash("1523438885200-e635ba2c371e", 900),
    florist: unsplash("1529636798458-92182e662485", 900),
    catering: unsplash("1525772764200-be829a350797", 900),
    makeup: unsplash("1546032996-6dfacbacbf3f", 900),
    fashion: unsplash("1478146896981-b80fe463b330", 900),
  },
  gallery: [
    {
      src: unsplash("1511285560929-80b456fea0bc", 1600),
      label: "The ceremony",
    },
    {
      src: unsplash("1507504031003-b417219a0fde", 900),
      label: "The details",
    },
    {
      src: unsplash("1515934751635-c81c6bc9a2d8", 900),
      label: "The vows",
    },
    {
      src: unsplash("1519225421980-715cb0215aed", 1000),
      label: "The table",
    },
    {
      src: unsplash("1532712938310-34cb3982ef74", 1600),
      label: "The celebration",
    },
  ],
};
