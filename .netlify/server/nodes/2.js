import * as universal from '../entries/pages/_page.ts.js';
import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.CsWtLAL1.js","_app/immutable/chunks/scheduler.B2_zg01e.js","_app/immutable/chunks/index.BZMHPOVI.js","_app/immutable/chunks/stores.DWahdaH4.js","_app/immutable/chunks/entry.BaoNi90D.js","_app/immutable/chunks/index.CQFOhXS_.js","_app/immutable/chunks/forms.OrjypM-T.js"];
export const stylesheets = ["_app/immutable/assets/2.l9V_leQN.css","_app/immutable/assets/index.B5SP-H43.css"];
export const fonts = [];
