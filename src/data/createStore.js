import { create } from 'zustand';
import { anonApi, userApi } from './api';

export const useUserStore = create((set) => ({
	userData: {},
	fetched: false,
	loggedIn: false,
	fetch: async () => {

	},
	login: async (email, password) => {
		const response = anonApi.post('/auth/tokens', {
			login: email,
			password,
			manual: 0
		});
		if (response.status === 201) {
			const token = await response.json();
			console.log(token);
			return;
		}

	},
	init: async () => {
		if (userApi.isLoggedIn()) {
			return this.fetch();
		}
		set({ fetched: true, isLoggedIn: false });
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
			toasts: [...state.toasts, {type: 'neutral', ...toast, id: toastId }]
		}));
	},
	clear: () => {
		set({ toasts: [] });
	},
}));

