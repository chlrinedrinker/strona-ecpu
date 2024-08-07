import * as server from '../entries/pages/zmianaHaseł/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/zmianaHaseł/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/zmianaHaseł/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.TAaXO2Bn.js","_app/immutable/chunks/scheduler.B2_zg01e.js","_app/immutable/chunks/index.BZMHPOVI.js","_app/immutable/chunks/index.CQFOhXS_.js","_app/immutable/chunks/forms.OrjypM-T.js","_app/immutable/chunks/entry.BaoNi90D.js"];
export const stylesheets = ["_app/immutable/assets/5.BtSLurTb.css","_app/immutable/assets/index.B5SP-H43.css"];
export const fonts = [];
