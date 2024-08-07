import { c as create_ssr_component, s as subscribe, v as validate_component } from "../../chunks/ssr.js";
import "devalue";
import "../../chunks/client.js";
import { u as userType, i as isLoggedIn } from "../../chunks/stores.js";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $logged, $$unsubscribe_logged;
  let $userType, $$unsubscribe_userType;
  $$unsubscribe_userType = subscribe(userType, (value) => $userType = value);
  const logged = isLoggedIn;
  $$unsubscribe_logged = subscribe(logged, (value) => $logged = value);
  $$unsubscribe_logged();
  $$unsubscribe_userType();
  return `<div class="flex items-center justify-between p-4 bg-gray-100 border-b z-100"><div class="flex items-center space-x-4" data-svelte-h="svelte-qjdmsa"><a href="/"><img src="/herb.png" alt="Logo" class="h-8"></a> <a href="/"><div>Gmina Łubnice</div></a></div> ${$logged ? `<div class="flex items-center space-x-4"><button class="px-4 py-2 bg-blue-500 text-white rounded" data-svelte-h="svelte-1vh86av">Organizacja</button> <button class="px-4 py-2 bg-blue-500 text-white rounded" data-svelte-h="svelte-bqki8h">Raporty</button> <div class="flex items-center space-x-2"><form method="post" action="?/wyloguj" data-svelte-h="svelte-1a8m0ru"><button class="px-4 py-2 bg-blue-500 text-white rounded">Wyloguj się</button></form> ${$userType == 0 ? `<div class="dropdown relative"><button class="px-4 py-2 bg-blue-500 text-white rounded m-1" data-svelte-h="svelte-dzrn24"><h1><a href="zmianaHaseł">Panel Administracyjny</a></h1></button></div> <a href="/signup" data-svelte-h="svelte-6cowg3"><button class="px-4 py-2 bg-blue-500 text-white rounded">Zarejestruj użytkownika</button></a>` : ``}</div> <div class="w-10 h-10 rounded-full bg-gray-300" data-svelte-h="svelte-5a6gx9"><img src="user.png" alt="User"></div></div>` : ``}</div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<container class="flex flex-col h-screen relative"> ${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``} <div class="p-4 bg-gray-100 border-t text-center" data-svelte-h="svelte-ftvgq7"><p>© 2024 Gmina Łubnice. Wszelkie prawa zastrzeżone.</p></div></container>`;
});
export {
  Layout as default
};
