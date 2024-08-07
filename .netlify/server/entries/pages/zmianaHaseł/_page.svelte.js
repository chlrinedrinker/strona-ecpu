import { c as create_ssr_component, s as subscribe, b as each, v as validate_component } from "../../../chunks/ssr.js";
import { U as Uzytkownik } from "../../../chunks/Uzytkownik.js";
import "devalue";
import "../../../chunks/client.js";
import { w as writable } from "../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_showLogs;
  let { data } = $$props;
  let selectedUser = null;
  const showLogs = writable(false);
  $$unsubscribe_showLogs = subscribe(showLogs, (value) => value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_showLogs();
  return `<div class="flex w-full h-screen"><div class="w-64 overflow-scroll h-screen">${each(data.pracownicy, (user) => {
    return `${validate_component(Uzytkownik, "Uzytkownik").$$render(
      $$result,
      {
        imie: user.imie,
        nazwisko: user.nazwisko,
        stanowisko: user.stanowisko,
        _id: user._id,
        selected: selectedUser
      },
      {},
      {}
    )}`;
  })}</div> <div class="flex-grow items-center justify-center bg-gray-100"><h1 class="text-center mb-4 text-5xl font-bold p-6" data-svelte-h="svelte-9iiq81">Panel administratora</h1> ${``}</div> ${``}</div>`;
});
export {
  Page as default
};
