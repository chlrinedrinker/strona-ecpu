import * as universal from '../entries/pages/_page.ts.js';
import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.D51b0Uji.js","_app/immutable/chunks/scheduler.CSB6Q-Hs.js","_app/immutable/chunks/index.BR2gqvZK.js","_app/immutable/chunks/stores.WBD-hLTP.js","_app/immutable/chunks/entry.BnYB-byH.js","_app/immutable/chunks/index.B2P7k3KH.js","_app/immutable/chunks/forms.BgChqCnb.js"];
export const stylesheets = ["_app/immutable/assets/2.l9V_leQN.css","_app/immutable/assets/index.B5SP-H43.css"];
export const fonts = [];
