export const SEO_CONFIG = {
  site: {
    url: "https://mohibur.trivora.top",
    title: "Shekh Mohibur Rahman - MERN Stack Developer",
    description:
      "Frontend-focused MERN stack developer. Explore my portfolio featuring React, Node.js, Express, MongoDB projects. Available for new opportunities.",
    image:
      "https://avatars.githubusercontent.com/u/119482264?s=400&u=528b8a3ab360e942989b48ebb5c448eabb6657ac&v=4",
    twitterHandle: "@mdmohibur_",
    twitterUrl: "https://x.com/mdmohibur_",
    name: "Shekh Mohibur Rahman",
    email: "mohibur.rahman2003@gmail.com",
    phone: "+8801849314613",
    location: "Bangladesh",
  },

  keywords: [
    "MERN stack developer",
    "React developer",
    "Node.js developer",
    "full stack developer",
    "frontend developer",
    "web development",
    "JavaScript",
    "TypeScript",
    "Express.js",
    "MongoDB",
    "portfolio",
  ],

  schemas: {
    person: {
      "@type": "Person",
      "@id": "https://mohibur.trivora.top/#person",
      name: "Shekh Mohibur Rahman",
      url: "https://mohibur.trivora.top/",
      jobTitle: "MERN Stack Developer",
      email: "mohibur.rahman2003@gmail.com",
      telephone: "+8801849314613",
    },

    organization: {
      "@type": "Organization",
      name: "Shekh Mohibur Rahman",
      url: "https://mohibur.trivora.top/",
      logo: "https://avatars.githubusercontent.com/u/119482264?s=400",
      sameAs: [
        "https://github.com/shekhmohibur",
        "https://facebook.com/mdmohib01",
      ],
    },
  },
};

export function generateMetaTags(
  title: string = SEO_CONFIG.site.title,
  description: string = SEO_CONFIG.site.description,
  image: string = SEO_CONFIG.site.image,
) {
  return {
    title,
    description,
    image,
  };
}

export function generateJsonLd(schema: Record<string, any>) {
  return {
    __html: JSON.stringify(schema),
  };
}

// Utility to create canonical URL
export function getCanonicalUrl(path: string = "/") {
  return `${SEO_CONFIG.site.url}${path}`;
}

// Rich snippet for skills
export function getSkillsSchema(skills: string[]) {
  return {
    "@type": "Thing",
    knowsAbout: skills,
  };
}

// FAQ Schema for frequently asked questions
export function getFaqSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
