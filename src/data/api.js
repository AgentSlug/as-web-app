export class AnonymousClient {
	#apiURl = import.meta.env.VITE_API_URL;

	async post(path, data) {
		const response = await fetch(`${this.#apiURl}${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return response.json();
	}
}

export class UserClient extends AnonymousClient {
	#token = null;
	#tokenKey = 'as-token';

	constructor() {
		super();
		this.#checkToken();
	}

	isLoggedIn() {
		return !!this.#token;
	}
	async #checkToken() {
		const tokenString = localStorage.getItem(this.#tokenKey);
		try {
			const token = JSON.parse(tokenString);
			this.#token = token;
		} catch (error) {
			localStorage.removeItem(this.#tokenKey);
			this.#token = null;
		}
	}

	async setToken(token) {
		localStorage.setItem(this.#tokenKey, JSON.stringify(token));
		this.#checkToken();
	}
}

export const anonApi = new AnonymousClient();
export const userApi = new UserClient();
