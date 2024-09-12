import { c as create_ssr_component, s as subscribe, a as createEventDispatcher, e as escape } from "./ssr.js";
import { e as exportDate } from "./stores2.js";
const Uzytkownik = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_exportDate;
  $$unsubscribe_exportDate = subscribe(exportDate, (value) => value);
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
  $$unsubscribe_exportDate();
  return `<button type="button" class="${"flex items-center w-full p-1 space-x-1 border-b cursor-pointer text-left " + escape(selected ? "border-blue-500" : "", true)}"><div class="relative flex-shrink-0"><img src="/user.png" alt="person" class="w-8 h-8 rounded-full bg-gray-300"> ${active ? `<span class="absolute right-0 bottom-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>` : ``}</div> <div class="flex-1 min-w-0"><div class="text-xs font-semibold truncate">${escape(imie)} ${escape(nazwisko)}</div> <div class="text-[10px] text-gray-500 truncate">${escape(stanowisko)}</div></div></button>`;
});
export {
  Uzytkownik as U
};
