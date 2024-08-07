import { c as create_ssr_component, d as createEventDispatcher, e as escape } from "./ssr.js";
const css = {
  code: ".absolute.svelte-ad5xbn{position:absolute}.bg-green-500.svelte-ad5xbn{background-color:#48bb78}.rounded-full.svelte-ad5xbn{border-radius:9999px}.border.svelte-ad5xbn{border-width:1px}.border-white.svelte-ad5xbn{border-color:#ffffff}",
  map: `{"version":3,"file":"Uzytkownik.svelte","sources":["Uzytkownik.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nexport let imie;\\nexport let nazwisko;\\nexport let stanowisko;\\nexport let _id;\\nexport let selected = false;\\nexport let active = false;\\nconst dispatch = createEventDispatcher();\\nfunction handleClick() {\\n  dispatch(\\"select\\", { imie, nazwisko, stanowisko, _id });\\n}\\n<\/script>\\n\\n<button\\n    type=\\"button\\"\\n    class=\\"flex items-center w-full p-2 space-x-2 border-b cursor-pointer text-left object-fill width {selected\\n        ? 'border-blue-500'\\n        : ''}\\"\\n    on:click={handleClick}\\n>\\n    <div class=\\"relative\\">\\n        <img\\n            src=\\"/user.png\\"\\n            alt=\\"person\\"\\n            class=\\"w-10 h-10 rounded-full bg-gray-300\\"\\n        />\\n        {#if active}\\n            <span\\n                class=\\"absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full border border-white\\"\\n            ></span>\\n        {/if}\\n    </div>\\n    <div>\\n        <div class=\\"text-sm font-semibold\\">{imie} {nazwisko}</div>\\n        <div class=\\"text-xs text-gray-500\\">{stanowisko}</div>\\n    </div>\\n</button>\\n\\n<style>\\n    .absolute {\\n        position: absolute;\\n    }\\n    .bg-green-500 {\\n        background-color: #48bb78;\\n    }\\n    .rounded-full {\\n        border-radius: 9999px;\\n    }\\n    .border {\\n        border-width: 1px;\\n    }\\n    .border-white {\\n        border-color: #ffffff;\\n    }\\n</style>\\n"],"names":[],"mappings":"AAuCI,uBAAU,CACN,QAAQ,CAAE,QACd,CACA,2BAAc,CACV,gBAAgB,CAAE,OACtB,CACA,2BAAc,CACV,aAAa,CAAE,MACnB,CACA,qBAAQ,CACJ,YAAY,CAAE,GAClB,CACA,2BAAc,CACV,YAAY,CAAE,OAClB"}`
};
const Uzytkownik = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { imie } = $$props;
  let { nazwisko } = $$props;
  let { stanowisko } = $$props;
  let { _id } = $$props;
  let { selected = false } = $$props;
  let { active = false } = $$props;
  createEventDispatcher();
  if ($$props.imie === void 0 && $$bindings.imie && imie !== void 0)
    $$bindings.imie(imie);
  if ($$props.nazwisko === void 0 && $$bindings.nazwisko && nazwisko !== void 0)
    $$bindings.nazwisko(nazwisko);
  if ($$props.stanowisko === void 0 && $$bindings.stanowisko && stanowisko !== void 0)
    $$bindings.stanowisko(stanowisko);
  if ($$props._id === void 0 && $$bindings._id && _id !== void 0)
    $$bindings._id(_id);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css);
  return `<button type="button" class="${"flex items-center w-full p-2 space-x-2 border-b cursor-pointer text-left object-fill width " + escape(selected ? "border-blue-500" : "", true)}"><div class="relative"><img src="/user.png" alt="person" class="w-10 h-10 rounded-full bg-gray-300 svelte-ad5xbn"> ${active ? `<span class="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full border border-white svelte-ad5xbn"></span>` : ``}</div> <div><div class="text-sm font-semibold">${escape(imie)} ${escape(nazwisko)}</div> <div class="text-xs text-gray-500">${escape(stanowisko)}</div></div> </button>`;
});
export {
  Uzytkownik as U
};
