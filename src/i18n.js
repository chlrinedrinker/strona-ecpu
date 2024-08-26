import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { createI18nStore } from "svelte-i18next";

i18next.use(LanguageDetector)
.use(HttpBackend)
.init({
 lng: 'en',
 resources: {
    en: {
      translation: {
        "key": "hello world"
      }
    }
  },
  interpolation: {
    escapeValue: false, // not needed for svelte as it escapes by default
  }
});

export default () => createI18nStore(i18next);