const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
let currentLanguage = "pl";
let translations = {};
async function loadLanguage(language) {
  currentLanguage = language;
  translations = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./locales/en.json": () => import("./en.js"), "./locales/pl.json": () => import("./pl.js") }), `./locales/${language}.json`);
  if (typeof window !== "undefined") {
    localStorage.setItem("language", language);
  }
}
function t(key) {
  return translations[key] || key;
}
if (typeof window !== "undefined") {
  const savedLanguage = localStorage.getItem("language");
  loadLanguage(savedLanguage || "pl");
}
export {
  currentLanguage as c,
  t
};
