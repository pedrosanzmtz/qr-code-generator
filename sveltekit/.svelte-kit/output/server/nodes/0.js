import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CekYGkiP.js","_app/immutable/chunks/BnKcIh8r.js","_app/immutable/chunks/CxmgvaLK.js","_app/immutable/chunks/BK6sXOLW.js"];
export const stylesheets = [];
export const fonts = [];
