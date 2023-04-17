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

