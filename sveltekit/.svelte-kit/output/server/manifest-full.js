export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.Dt9Gsp1H.js",app:"_app/immutable/entry/app.DvQdHPkg.js",imports:["_app/immutable/entry/start.Dt9Gsp1H.js","_app/immutable/chunks/DPFrwCez.js","_app/immutable/chunks/CxmgvaLK.js","_app/immutable/chunks/DvBLC2Y4.js","_app/immutable/entry/app.DvQdHPkg.js","_app/immutable/chunks/CxmgvaLK.js","_app/immutable/chunks/CI3Wu3_m.js","_app/immutable/chunks/BnKcIh8r.js","_app/immutable/chunks/DvBLC2Y4.js","_app/immutable/chunks/BK6sXOLW.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
