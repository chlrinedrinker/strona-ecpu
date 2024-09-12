import { c as create_ssr_component, s as subscribe, e as escape, d as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import "devalue";
import "../../chunks/client.js";
import { u as userType, i as isLoggedIn } from "../../chunks/stores2.js";
import { t } from "../../chunks/i18n.js";
import { p as page } from "../../chunks/stores.js";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $logged, $$unsubscribe_logged;
  let $userType, $$unsubscribe_userType;
  $$unsubscribe_userType = subscribe(userType, (value) => $userType = value);
  let currentLanguage = "pl";
  const logged = isLoggedIn;
  $$unsubscribe_logged = subscribe(logged, (value) => $logged = value);
  async function fetchHoursForAllUsers() {
    return;
  }
  {
    fetchHoursForAllUsers();
  }
  $$unsubscribe_logged();
  $$unsubscribe_userType();
  return `<div class="flex items-center justify-between p-2 md:p-4 bg-gray-100 border-b z-100 w-full"><div class="flex items-center space-x-2 md:space-x-4" data-svelte-h="svelte-1tu9wz0"><a href="/"><img src="/herb.webp" alt="Logo" class="h-6 w-5.5 sm:h-8 sm:w-8 md:w-11 md:h-12"></a> <a href="/"><div class="text-sm sm:text-base md:text-lg">Gmina Łubnice</div></a></div> <div class="flex items-center space-x-2 md:space-x-4 relative"><div class="flex space-x-2 right"><button class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left">${escape(currentLanguage.toUpperCase())}</button></div> ${$logged ? `${`${$userType != 2 ? `<button class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded">${escape(t("generate_report"))}</button>` : ``} <button class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"><a href="/zmianaHaslaIndiwidualna">${escape(t("change_password"))}</a></button> ${$userType == 0 ? `<button class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"><a href="/zmianaHasel">${escape(t("admin_panel"))}</a></button> <button class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"><a href="/signup">${escape(t("register_user"))}</a></button>` : ``} <form method="post" action="?/wyloguj"><button type="submit" class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded">${escape(t("logout"))}</button></form>`} <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 hidden lg:block" data-svelte-h="svelte-1juafxa"><img src="user.png" alt="User" class="w-full h-full rounded-full"></div>` : ``}</div></div>  ${$userType != 2 ? `${``}` : ``}`;
});
const appName = "Ewidencja Czasu Pracy";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  title = [appName, ...$page.url.pathname.split("/").slice(1)].filter(Boolean).join(" - ");
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-dney7g_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="description"${add_attribute("content", title, 0)}><!-- HEAD_svelte-dney7g_END -->`, ""} <container class="flex flex-col relative w-full"> ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``} <div class="p-4 bg-gray-100 border-t text-center" data-svelte-h="svelte-ftvgq7"><p>© 2024 Gmina Łubnice. Wszelkie prawa zastrzeżone.</p></div></container>`;
});
export {
  Layout as default
};
