import { createContext, useContext, useState, useCallback } from 'react';
import { en, fr } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = window.localStorage.getItem('portfolio-lang');
    return saved === 'fr' ? 'fr' : 'en';
  });

  const t = useCallback((key) => {
    const translations = lang === 'fr' ? fr : en;
    return translations[key] ?? key;
  }, [lang]);

  const tp = useCallback((project, field) => {
    if (lang === 'fr' && project.fr && project.fr[field] !== undefined) return project.fr[field];
    return project[field];
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'fr' : 'en';
      window.localStorage.setItem('portfolio-lang', next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t, tp, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
