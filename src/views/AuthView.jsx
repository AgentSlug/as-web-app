import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {LoginForm} from '../components/Auth/LoginForm';
import {useTranslation} from "react-i18next";

const Layout = ({ children, type = 'signIn'}) => {
	const [t] = useTranslation();
	const headline = t(`common.${type}`);

	return (
		<div className="as-main--auth__main as-glass">
			<h1>{headline}</h1>
			{children}
		</div>
	);
};
const LoginBox = () => {
	return (
		<Layout>
			<LoginForm />
		</Layout>
	);
};

const RegisterBox = () => {
	return null;
};
const MagicLinkBox = () => {
	return null;
};

export const AuthView = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	useEffect(() => {
		if (pathname === '/auth') {
			navigate('/auth/login');
		}
	}, [pathname, navigate]);

	return (
		<Routes>
			<Route path="login" element={<LoginBox />} default />
			<Route path="register" element={<RegisterBox />} />
			<Route path="magic-link" element={<MagicLinkBox />} />
		</Routes>
	);
};

export default AuthView;
