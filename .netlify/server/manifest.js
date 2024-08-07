export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","herb.png","user.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CHbSQmQF.js","app":"_app/immutable/entry/app.D1t8sXYt.js","imports":["_app/immutable/entry/start.CHbSQmQF.js","_app/immutable/chunks/entry.BaoNi90D.js","_app/immutable/chunks/scheduler.B2_zg01e.js","_app/immutable/entry/app.D1t8sXYt.js","_app/immutable/chunks/scheduler.B2_zg01e.js","_app/immutable/chunks/index.BZMHPOVI.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
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
				id: "/zmianaHaseł",
				pattern: /^\/zmianaHaseł\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
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
