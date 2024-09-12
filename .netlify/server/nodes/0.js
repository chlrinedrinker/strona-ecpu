import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DgX4vGP0.js","_app/immutable/chunks/scheduler.D9eUT3Oo.js","_app/immutable/chunks/index.Bye0e5Z4.js","_app/immutable/chunks/each.Bz4FPqbm.js","_app/immutable/chunks/i18n.CiqHmo9q.js","_app/immutable/chunks/entry.DGLoN6pP.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/stores.FrZGAWq7.js","_app/immutable/chunks/stores.CDY96dhH.js"];
export const stylesheets = ["_app/immutable/assets/0.DltaJJIz.css"];
export const fonts = [];
