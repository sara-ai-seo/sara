export type ExploreContentTableItemType = {
  info: {
    title: string;
    link: string;
    description: string;
    author: string;
    date_published: Date;
    language: string;
    socialMediaHandles?: {
      [key: string]: number;
    };
  };
  dr: number;
  ur: number;
  bss: number;
  page_type: string;
  rating: number;
  cqs: number;
  content_type: string;
  sentiment: string[];
};

export const exploreContentTableData: ExploreContentTableItemType[] = [
  {
    info: {
      title: "Best Travel Destinations",
      link: "https://forbes.com/blog/",
      description:
        "You can use the string provided in this field to get the quest results of the initial task... Note: offset_token values are unique for each sub task.",
      author: "John Wick",
      date_published: new Date(),
      language: "En",
      socialMediaHandles: {
        facebook: 200,
        instagram: 400,
      },
    },
    dr: 150,
    ur: 22,
    bss: 15,
    page_type: "Travel Guide",
    rating: 9,
    cqs: 25,
    content_type: "Guide",
    sentiment: ["50%", "40%", "90%"],
  },
  {
    info: {
      title: "Branding your business 101",
      link: "https://cnn.com/blog/",
      description:
        "Generally refers to a broader evaluation of content based on various  criteria such as quality, relevance, readability, engagement, and SEO  performance...",
      author: "John Wick",
      date_published: new Date(),
      language: "Fr",
      socialMediaHandles: {
        facebook: 2000,
        twitter: 400,
      },
    },
    dr: 175,
    ur: 37,
    bss: 20,
    page_type: "Blog",
    rating: 8,
    cqs: 18,
    content_type: "Article",
    sentiment: ["40%", "55%", "80%"],
  },

  {
    info: {
      title: "Financial Market Updates",
      link: "https://cnn.com/blog/",
      description:
        "You can use the string provided in this field to get the quest results of the initial task... Note: offset_token values are unique for each sub task.",
      author: "John Wick",
      date_published: new Date(),
      language: "Fr",
      socialMediaHandles: {
        facebook: 2000,
        twitter: 400,
      },
    },

    dr: 210,
    ur: 58,
    bss: 22,
    page_type: "Finance",
    rating: 7,
    cqs: 30,
    content_type: "Report",
    sentiment: ["25%", "65%", "85%"],
  },
  {
    info: {
      title: "How to get things done",
      link: "https://cnn.com/blog/",
      description:
        "You can use the string provided in this field to get the quest results of the initial task... Note: offset_token values are unique for each sub task.",
      author: "John Wick",
      date_published: new Date(),
      language: "Fr",
      socialMediaHandles: {
        facebook: 2000,
        twitter: 400,
      },
    },
    dr: 195,
    ur: 48,
    bss: 19,
    page_type: "Blog",
    rating: 6,
    cqs: 22,
    content_type: "Review",
    sentiment: ["35%", "70%", "75%"],
  },
];
