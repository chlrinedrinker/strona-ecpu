import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.CcLoEYva.js","_app/immutable/chunks/scheduler.CSB6Q-Hs.js","_app/immutable/chunks/index.BR2gqvZK.js","_app/immutable/chunks/forms.BgChqCnb.js","_app/immutable/chunks/entry.BnYB-byH.js","_app/immutable/chunks/stores.WBD-hLTP.js"];
export const stylesheets = ["_app/immutable/assets/0.BPSRsYNz.css"];
export const fonts = [];
