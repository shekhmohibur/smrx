import { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

export function useMetaTags({
  title = "Shekh Mohibur Rahman - MERN Stack Developer",
  description = "Frontend-focused MERN stack developer. Explore my portfolio featuring React, Node.js, Express, MongoDB projects.",
  image = "https://avatars.githubusercontent.com/u/119482264?s=400",
  url = "https://shekhmohibur.dev",
  type = "website",
  author = "Shekh Mohibur Rahman",
}: MetaTagsProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(
        `meta[name="${name}"], meta[property="${name}"]`,
      ) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateMetaTag("description", description);
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:url", url);
    updateMetaTag("og:type", type);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("author", author);

    // Update canonical URL
    let canonical = document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, image, url, type, author]);
}

export function useStructuredData(data: Record<string, any>) {
  useEffect(() => {
    // Create or update structured data script
    let scriptTag = document.querySelector(
      "script[type='application/ld+json'][data-component]",
    ) as HTMLScriptElement;

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      scriptTag.setAttribute("data-component", "true");
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(data);
  }, [data]);
}
