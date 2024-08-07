import { c as create_ssr_component, s as subscribe, b as each, v as validate_component } from "../../chunks/ssr.js";
import { u as userType, i as isLoggedIn } from "../../chunks/stores.js";
import { U as Uzytkownik } from "../../chunks/Uzytkownik.js";
import "flatpickr";
import "devalue";
import "../../chunks/client.js";
import { w as writable } from "../../chunks/index2.js";
import "pdfmake/build/pdfmake.js";
const Uzytkownicy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLoading, $$unsubscribe_isLoading;
  let $$unsubscribe_logowaniaStore;
  let { pracownicy } = $$props;
  let { aktywniPracownicy } = $$props;
  let logowaniaStore = writable({});
  $$unsubscribe_logowaniaStore = subscribe(logowaniaStore, (value) => value);
  let selectedUser = null;
  const isLoading = writable(false);
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  function isUserActive(user) {
    return aktywniPracownicy.some((use) => {
      return use["_id"] == user["_id"];
    });
  }
  if ($$props.pracownicy === void 0 && $$bindings.pracownicy && pracownicy !== void 0)
    $$bindings.pracownicy(pracownicy);
  if ($$props.aktywniPracownicy === void 0 && $$bindings.aktywniPracownicy && aktywniPracownicy !== void 0)
    $$bindings.aktywniPracownicy(aktywniPracownicy);
  $$unsubscribe_isLoading();
  $$unsubscribe_logowaniaStore();
  return `<div class="w-64 overflow-scroll h-screen">${$isLoading ? `<div data-svelte-h="svelte-194gxkm">Loading...</div>` : `${each(pracownicy, (user) => {
    return `${validate_component(Uzytkownik, "Uzytkownik").$$render(
      $$result,
      {
        imie: user.imie,
        nazwisko: user.nazwisko,
        stanowisko: user.stanowisko,
        selected: selectedUser,
        active: isUserActive(user)
      },
      {},
      {}
    )}`;
  })}`}</div> ${``} ${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_userType;
  let $$unsubscribe_isLoggedIn;
  $$unsubscribe_userType = subscribe(userType, (value) => value);
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_userType();
  $$unsubscribe_isLoggedIn();
  return `<div class="flex flex-grow"><div class="flex space-x-4"> ${validate_component(Uzytkownicy, "Uzytkownicy").$$render(
    $$result,
    {
      pracownicy: data.pracownicy,
      aktywniPracownicy: data.active
    },
    {},
    {}
  )}  <div class="flex-grow" data-svelte-h="svelte-1js0eo0"></div></div> </div>`;
});
export {
  Page as default
};
