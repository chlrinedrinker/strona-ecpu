

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.p0fElsJ8.js","_app/immutable/chunks/scheduler.B2_zg01e.js","_app/immutable/chunks/index.BZMHPOVI.js","_app/immutable/chunks/entry.BaoNi90D.js"];
export const stylesheets = [];
export const fonts = [];
