export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","herb.webp","user.png"]),
	mimeTypes: {".png":"image/png",".webp":"image/webp"},
	_: {
		client: {"start":"_app/immutable/entry/start.BK7hTiuW.js","app":"_app/immutable/entry/app.C9perdSE.js","imports":["_app/immutable/entry/start.BK7hTiuW.js","_app/immutable/chunks/entry.DGLoN6pP.js","_app/immutable/chunks/scheduler.D9eUT3Oo.js","_app/immutable/entry/app.C9perdSE.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.D9eUT3Oo.js","_app/immutable/chunks/index.Bye0e5Z4.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/endpoints/CzasPracy",
				pattern: /^\/endpoints\/CzasPracy\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/endpoints/CzasPracy/_server.ts.js'))
			},
			{
				id: "/endpoints/ImieNazStanow",
				pattern: /^\/endpoints\/ImieNazStanow\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/endpoints/ImieNazStanow/_server.ts.js'))
			},
			{
				id: "/endpoints/SaveComment",
				pattern: /^\/endpoints\/SaveComment\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/endpoints/SaveComment/_server.ts.js'))
			},
			{
				id: "/endpoints/SpawdzanieUnikalnych/UnikalneLoginy",
				pattern: /^\/endpoints\/SpawdzanieUnikalnych\/UnikalneLoginy\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/endpoints/SpawdzanieUnikalnych/UnikalneLoginy/_server.ts.js'))
			},
			{
				id: "/endpoints/SpawdzanieUnikalnych/UnikalneNazwy",
				pattern: /^\/endpoints\/SpawdzanieUnikalnych\/UnikalneNazwy\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/endpoints/SpawdzanieUnikalnych/UnikalneNazwy/_server.ts.js'))
			},
			{
				id: "/endpoints/user-hours",
				pattern: /^\/endpoints\/user-hours\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/endpoints/user-hours/_server.ts.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/zmianaHasel",
				pattern: /^\/zmianaHasel\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/zmianaHaslaIndiwidualna",
				pattern: /^\/zmianaHaslaIndiwidualna\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
