

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.csvKS_w0.js","_app/immutable/chunks/BnKcIh8r.js","_app/immutable/chunks/CxmgvaLK.js","_app/immutable/chunks/DEPBGi75.js"];
export const stylesheets = [];
export const fonts = [];
