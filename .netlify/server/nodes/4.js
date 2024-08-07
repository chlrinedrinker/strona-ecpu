import * as server from '../entries/pages/signup/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/signup/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/signup/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.BbZxfitY.js","_app/immutable/chunks/scheduler.B2_zg01e.js","_app/immutable/chunks/index.BZMHPOVI.js","_app/immutable/chunks/entry.BaoNi90D.js","_app/immutable/chunks/forms.OrjypM-T.js"];
export const stylesheets = [];
export const fonts = [];
