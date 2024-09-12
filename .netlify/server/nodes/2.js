import * as universal from '../entries/pages/_page.ts.js';
import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.CUxGyRP0.js","_app/immutable/chunks/scheduler.D9eUT3Oo.js","_app/immutable/chunks/index.Bye0e5Z4.js","_app/immutable/chunks/stores.FrZGAWq7.js","_app/immutable/chunks/entry.DGLoN6pP.js","_app/immutable/chunks/each.Bz4FPqbm.js","_app/immutable/chunks/index.CH2x0n-5.js","_app/immutable/chunks/i18n.CiqHmo9q.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js"];
export const stylesheets = ["_app/immutable/assets/2.EOs3vanD.css"];
export const fonts = [];
