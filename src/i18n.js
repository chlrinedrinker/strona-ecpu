let currentLanguage = 'pl'; // Domyślny język
let translations = {};

async function loadLanguage(language) {
  currentLanguage = language;
  translations = await import(`./locales/${language}.json`);
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language);
  }
}

function t(key) {
  return translations[key] || key;
}

// Inicjalizacja języka przy starcie aplikacji
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('language');
  loadLanguage(savedLanguage || 'pl');
}

export { t, loadLanguage, currentLanguage };
