import * as server from '../entries/pages/zmianaHasel/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/zmianaHasel/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/zmianaHasel/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.JnFs4BMX.js","_app/immutable/chunks/scheduler.D9eUT3Oo.js","_app/immutable/chunks/index.Bye0e5Z4.js","_app/immutable/chunks/each.Bz4FPqbm.js","_app/immutable/chunks/index.CH2x0n-5.js","_app/immutable/chunks/stores.FrZGAWq7.js","_app/immutable/chunks/entry.DGLoN6pP.js","_app/immutable/chunks/i18n.CiqHmo9q.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js"];
export const stylesheets = ["_app/immutable/assets/5.BzU6fktG.css"];
export const fonts = [];
