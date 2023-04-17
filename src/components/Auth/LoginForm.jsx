import React, { useMemo } from 'react';
import {create} from 'zustand';
import {useUserStore} from '../../data/createStore';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
	const [t] = useTranslation();
	const user = useUserStore();
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

	const handleSubmit = (e) => {
		e.preventDefault();
		user.login(form.email, form.password);
	};

	return (
		<form onSubmit={handleSubmit} className="as-form">
			<div className="as-form__group">
				<label htmlFor="email" className="as-form__label">{t('common.email')}</label>
				<input type="email" name="email" id="email" className="as-form__input" onChange={handleChange} />
			</div>
			<div className="as-form__group">
				<label htmlFor="password" className="as-form__label">{t('common.password')}</label>
				<input type="password" name="password" id="password" className="as-form__input" onChange={handleChange} />
			</div>
			<div className="as-form__actions">
				<button type="submit" className="as-btn as-btn--primary">{t('common.login')}</button>
			</div>
		</form>
	);
};
