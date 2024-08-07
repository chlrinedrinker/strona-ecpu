import * as server from '../entries/pages/zmianaHaseł/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/zmianaHaseł/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/zmianaHaseł/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BbxlD0BO.js","_app/immutable/chunks/scheduler.CSB6Q-Hs.js","_app/immutable/chunks/index.BR2gqvZK.js","_app/immutable/chunks/index.B2P7k3KH.js","_app/immutable/chunks/forms.BgChqCnb.js","_app/immutable/chunks/entry.BnYB-byH.js"];
export const stylesheets = ["_app/immutable/assets/5.BtSLurTb.css","_app/immutable/assets/index.B5SP-H43.css"];
export const fonts = [];
