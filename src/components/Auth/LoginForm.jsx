import React, { useMemo } from 'react';
import {create} from 'zustand';
import {useToastStore, useUserStore} from '../../data/createStore';
import { useTranslation } from 'react-i18next';
import {
	Form,
	FormGroup,
	FormSubmit,
	FormInput,
	FormActions,
} from '../Form';

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
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<FormInput
					label={l.t('common.email')}
					type="email"
					name="email"
					required
					onChange={handleChange}
				/>
			</FormGroup>
			<FormGroup>
				<FormInput
					label={l.t('common.password')}
					type="password"
					name="password"
					required
					onChange={handleChange}
				/>
			</FormGroup>
			<FormActions>
				<FormSubmit label={l.t('common.login')} />
			</FormActions>
		</Form>
	);
};
