export class AnonymousClient {
	apiURl = import.meta.env.VITE_API_URL;

	handleErrors(response) {
		if (!response.ok) {
			const error = new Error('Request failed');
			error.status = response.status;
			throw error;
		}
	}
	async post(path, data) {
		const response = await fetch(`${this.apiURl}${path}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		this.handleErrors(response);
		const body = await response.json();

		return [body, response];
	}
}

export class UserClient extends AnonymousClient {
	#token = null;
	#tokenKey = 'as-token';

	constructor() {
		super();
		this.#checkToken();
	}

	async get(path) {
		const response = await fetch(`${this.apiURl}${path}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${this.#token}`
			}
		});
		this.handleErrors(response);

		const body = await response.json();

		return [body, response];
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
			this.removeToken();
		}
	}

	async setToken(token) {
		localStorage.setItem(this.#tokenKey, JSON.stringify(token));
		this.#checkToken();
	}

	async removeToken() {
		localStorage.removeItem(this.#tokenKey);
		this.#token = null;
	}
}

export const anonApi = new AnonymousClient();
export const userApi = new UserClient();
