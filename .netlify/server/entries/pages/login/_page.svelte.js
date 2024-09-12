import { c as create_ssr_component, s as subscribe, e as escape } from "../../../chunks/ssr.js";
import "devalue";
import "../../../chunks/client.js";
import { i as isLoggedIn } from "../../../chunks/stores2.js";
import { t } from "../../../chunks/i18n.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_isLoggedIn;
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => value);
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$unsubscribe_isLoggedIn();
  return `  <main class="flex flex-col items-center justify-center h-screen bg-gray-100"><h1 class="text-2xl font-bold mb-4">${escape(t("login"))}</h1> <form class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md" method="post"><div><label for="username" class="block mb-2">${escape(t("username"))}:</label> <input type="text" id="username" name="username" required class="w-full p-2 border border-gray-300 rounded"></div> <div><label for="password" class="block mb-2">${escape(t("password"))}:</label> <input type="password" id="password" name="password" required class="w-full p-2 border border-gray-300 rounded"></div> ${form?.message ? `<p class="text-red-500 text-sm mt-1">${escape(form.message)}</p>` : ``} <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" data-svelte-h="svelte-1bs16rd">Login</button></form></main>`;
});
export {
  Page as default
};
