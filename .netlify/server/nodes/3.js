import * as server from '../entries/pages/login/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.DlBfKa3h.js","_app/immutable/chunks/scheduler.D9eUT3Oo.js","_app/immutable/chunks/index.Bye0e5Z4.js","_app/immutable/chunks/i18n.CiqHmo9q.js","_app/immutable/chunks/entry.DGLoN6pP.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/stores.FrZGAWq7.js"];
export const stylesheets = [];
export const fonts = [];
