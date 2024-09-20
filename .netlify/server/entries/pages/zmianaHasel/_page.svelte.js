import { c as create_ssr_component, s as subscribe, d as add_attribute, f as each, v as validate_component } from "../../../chunks/ssr.js";
import { U as Uzytkownik } from "../../../chunks/Uzytkownik.js";
import "devalue";
import "../../../chunks/client.js";
import "../../../chunks/i18n.js";
import { w as writable } from "../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $showUserList, $$unsubscribe_showUserList;
  let { data } = $$props;
  let { form } = $$props;
  let selectedUser = null;
  const showUserList = writable(true);
  $$unsubscribe_showUserList = subscribe(showUserList, (value) => $showUserList = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$unsubscribe_showUserList();
  return `<div class="flex w-full h-screen flex-col md:flex-row"><div${add_attribute("class", `w-64 overflow-y-visible overflow-scroll h-screen lg:block ${$showUserList ? "block" : "hidden"} lg:visible bg-white`, 0)}>${each(data.pracownicy, (user) => {
    return `${validate_component(Uzytkownik, "Uzytkownik").$$render(
      $$result,
      {
        imie: user.imie,
        nazwisko: user.nazwisko,
        stanowisko: user.stanowisko,
        selected: selectedUser
      },
      {},
      {}
    )}`;
  })}</div> ${``} <div class="w-full md:flex-grow md:items-center md:justify-center bg-gray-100 p-4 md:p-6">${``}</div> ${``}</div>`;
});
export {
  Page as default
};
