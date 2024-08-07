import { c as create_ssr_component, s as subscribe } from "../../../chunks/ssr.js";
import "devalue";
import "../../../chunks/client.js";
import { i as isLoggedIn } from "../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_isLoggedIn;
  $$unsubscribe_isLoggedIn = subscribe(isLoggedIn, (value) => value);
  $$unsubscribe_isLoggedIn();
  return `  <main class="flex flex-col items-center justify-center h-screen bg-gray-100"><h1 class="text-2xl font-bold mb-4" data-svelte-h="svelte-q9i5rl">Login</h1> <form class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md" method="post"><div data-svelte-h="svelte-68r9w9"><label for="username" class="block mb-2">Username:</label> <input type="text" id="username" name="username" required class="w-full p-2 border border-gray-300 rounded"></div> <div data-svelte-h="svelte-7rt5f5"><label for="password" class="block mb-2">Password:</label> <input type="password" id="password" name="password" required class="w-full p-2 border border-gray-300 rounded"></div> ${``} <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600" data-svelte-h="svelte-9kldnz">Login</button></form></main>`;
});
export {
  Page as default
};
