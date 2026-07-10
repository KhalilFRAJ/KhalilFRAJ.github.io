import { useEffect } from 'react';

export function usePageMeta({ title, description, path, image }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMeta = (name, content, property) => {
      if (!content) return;
      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', property);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const removeMeta = (selector) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    };

    removeMeta('meta[property="og:title"]');
    removeMeta('meta[property="og:description"]');
    removeMeta('meta[property="og:url"]');
    removeMeta('meta[property="og:image"]');
    removeMeta('meta[name="twitter:title"]');
    removeMeta('meta[name="twitter:description"]');
    removeMeta('meta[name="twitter:image"]');

    if (title) {
      setMeta('og:title', title, 'og:title');
      setMeta('twitter:title', title);
    }
    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, 'og:description');
      setMeta('twitter:description', description);
    }
    if (path) {
      const url = `${window.location.origin}${path}`;
      setMeta('og:url', url, 'og:url');
    }
    if (image) {
      const imgUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
      setMeta('og:image', imgUrl, 'og:image');
      setMeta('twitter:image', imgUrl);
    }
    setMeta('og:type', 'website', 'og:type');
    setMeta('twitter:card', 'summary_large_image');
  }, [title, description, path, image]);
}
