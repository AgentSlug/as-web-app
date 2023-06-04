import React, { useId } from 'react';

export const Form = ({ onSubmit, children }) => {
	return (
		<form onSubmit={onSubmit} className="as-form">
			{children}
		</form>
	);
};

export const FormGroup = ({ children }) => {
	return (
		<div className="as-form__group">
			{children}
		</div>
	);
};

export const FormActions = ({ children }) => {
	return (
		<div className="as-form__actions">
			{children}
		</div>
	);
};

export const FormInput = ({ label, type, name, required, onChange }) => {
	const id = useId();
	return (
		<>
			<label htmlFor={id} className="as-form__label">{label}</label>
			<input
				type={type}
				name={name}
				id={id}
				className="as-form__input"
				required={required}
				onChange={onChange}
			/>
		</>
	);
};

export const FormSubmit = ({ label }) => {
	return (
		<button type="submit" className="as-btn as-btn--primary">{label}</button>
	);
};
