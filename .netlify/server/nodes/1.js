

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BKPq9R_z.js","_app/immutable/chunks/scheduler.CSB6Q-Hs.js","_app/immutable/chunks/index.BR2gqvZK.js","_app/immutable/chunks/entry.BnYB-byH.js"];
export const stylesheets = [];
export const fonts = [];
