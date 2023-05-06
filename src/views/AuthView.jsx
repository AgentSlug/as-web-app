import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {LoginForm} from '../components/Auth/LoginForm';
import classNames from 'html-classnames';

const LayoutMain = ({ children, headline }) => {
	return (
		<div className="as-main--auth__main as-glass">
			<h1>{headline}</h1>
			<div>
				{children}
			</div>
		</div>
	);
};

const LayoutAddon = ({ children, type }) => {
	const classes = classNames('as-main--auth__addon', {
		'__addon': true,
		[`--${type}`]: true,
	});

	return (
		<div className={`${classes} as-glass as-glass--flip`}>
			{ children }
		</div>
	);
};

const MagicLinkTeaser = () => {
	const [t] = useTranslation();
	return (
		<LayoutAddon type="magic-link">
			<h2>{t('auth.magicLinkHeadline')}</h2>
			<div>
				<p>{t('auth.magicLinkDescription')}</p>
				<a
					href="/auth/magic-link"
					className="as-btn">
					{t('auth.magicLinkCTA')}
				</a>
			</div>
		</LayoutAddon>
	);
};

const RegisterTeaser = () => {
	const [t] = useTranslation();
	return (
		<LayoutAddon type="register">
			<h2>{t('auth.registerHeadline')}</h2>
			<div>
				<p>{t('auth.registerDescription')}</p>
				<a
					href="/auth/register"
					className="as-btn">
					{t('auth.registerCTA')}
				</a>
			</div>
		</LayoutAddon>
	);
};

const LoginBox = () => {
	const [t] = useTranslation();
	const type = 'signIn';
	const headline = t(`common.${type}`);
	return (
		<>
			<LayoutMain headline={headline}>
				<LoginForm />
			</LayoutMain>
			<MagicLinkTeaser />
			<RegisterTeaser />
		</>
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
