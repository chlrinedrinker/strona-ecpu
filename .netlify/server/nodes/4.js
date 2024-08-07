import * as server from '../entries/pages/signup/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/signup/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/signup/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.4MIgXB2o.js","_app/immutable/chunks/scheduler.CSB6Q-Hs.js","_app/immutable/chunks/index.BR2gqvZK.js","_app/immutable/chunks/entry.BnYB-byH.js","_app/immutable/chunks/forms.BgChqCnb.js"];
export const stylesheets = [];
export const fonts = [];
