import React, { useMemo } from 'react';
import {create} from 'zustand';
import {useToastStore, useUserStore} from '../../data/createStore';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
	const l = useTranslation();
	const user = useUserStore();
	const toast = useToastStore();

	const useForm = useMemo(() => create((set) => ({
		email: '',
		password: '',
		setField: (name, value) => {
			set({[name]: value});
		}
	})), []);
	const form = useForm();

	const handleChange = (e) => {
		form.setField(e.target.name, e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await user.login(form.email, form.password);
		} catch (error) {
			console.warn(error);
			const messageKey = error?.status === 429 ? 'tooManyRequests' : 'loginFailed';
			const message = l.t(`errors.${messageKey}`);
			toast.dispatch({
				message,
				type: 'error',
			});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="as-form">
			<div className="as-form__group">
				<label htmlFor="email" className="as-form__label">{l.t('common.email')}</label>
				<input
					type="email"
					name="email"
					id="email"
					className="as-form__input"
					required
					onChange={handleChange}
				/>
			</div>
			<div className="as-form__group">
				<label htmlFor="password" className="as-form__label">{l.t('common.password')}</label>
				<input
					type="password"
					name="password"
					id="password"
					className="as-form__input"
					required
					onChange={handleChange}
				/>
			</div>
			<div className="as-form__actions">
				<button type="submit" className="as-btn as-btn--primary">{l.t('common.login')}</button>
			</div>
		</form>
	);
};
