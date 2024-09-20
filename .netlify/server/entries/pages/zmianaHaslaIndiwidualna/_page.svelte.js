import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
import "devalue";
import "../../../chunks/client.js";
import { t } from "../../../chunks/i18n.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="flex flex-col items-center justify-center h-screen bg-gray-100 p-6"><h1 class="text-5xl font-bold mb-4">${escape(t("change_password"))}</h1> ${``} <form class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-3xl" method="post" action="?/ZmianaHasła"> <div class="flex gap-4"><div class="flex-1"><label for="username" class="block mb-2">${escape(t("current_password"))}:</label> <input type="password" id="password" name="password" required class="w-full p-2 border border-gray-300 rounded"> ${``}</div> <div class="flex-1"><label for="password" class="block mb-2">${escape(t("new_password"))}:</label> <input type="password" id="password_repeat" name="password_repeat" required class="w-full p-2 border border-gray-300 rounded"> ${``}</div></div> <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">${escape(t("change_password"))}</button></form></main>`;
});
export {
  Page as default
};
