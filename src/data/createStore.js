import { create } from 'zustand';
import { anonApi, userApi } from './api';

export const useUserStore = create((set, get) => ({
	data: {},
	fetched: false,
	loggedIn: false,
	fetch: async () => {
		const [body] = await userApi.get('/account');
		const { User } = body;
		set({ data: {...User}, fetched: true, loggedIn: true });
	},
	login: async (email, password) => {
		const [body, response]  = await anonApi.post('/auth/tokens', {
			login: email,
			password,
			manual: 0
		});
		if (response.status !== 201) {
			throw new Error('Invalid response code');
		}

		const { Token } = body;
		const token = Token.token;
		await userApi.setToken(token);
		get().init();
	},
	logout() {
		userApi.removeToken();
		set({ data: {}, fetched: true, loggedIn: false });
	},
	init: async () => {
		if (userApi.isLoggedIn()) {
			return get().fetch();
		}
		set({ fetched: true, loggedIn: false });
	}
}));

let toastId = 0;
/**
 * @typedef {Object} Toast
 * @property {string} message
 * @property {("neutral","success", "error", "warning")} type
 * @property {number} id
 */
export const useToastStore = create((set, get) => ({
	/**
	 * @type {Toast[]}
	 */
	toasts: [],
	/**
	 *
	 * @returns {Toast|null}
	 */
	getCurrent: () => {
		const { toasts } = get();
		return toasts.length > 0 ? toasts[0] : null;
	},
	/**
	 *
	 * @returns {Toast|null}
	 */
	getNext: () => {
		const { toasts } = get();
		return toasts.length > 1 ? toasts[1] : null;
	},
	didHide: () => {
		set((state) => ({
			toasts: state.toasts.slice(1)
		}));
	},
	/**
	 *
	 * @param {Toast} toast
	 */
	dispatch: (toast) => {
		toastId++;
		set((state) => ({
			toasts: [...state.toasts, { type: 'neutral', id: toastId, ...toast }]
		}));
	},
	clear: () => {
		set({ toasts: [] });
	},
}));

