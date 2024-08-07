import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.Dh7s17yQ.js","_app/immutable/chunks/scheduler.B2_zg01e.js","_app/immutable/chunks/index.BZMHPOVI.js","_app/immutable/chunks/forms.CLpRKmRT.js","_app/immutable/chunks/entry.P9NxvI1k.js","_app/immutable/chunks/stores.D685DlOU.js"];
export const stylesheets = ["_app/immutable/assets/0.BPSRsYNz.css"];
export const fonts = [];
