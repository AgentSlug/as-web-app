import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Container} from '../components/Container';
import {Bubbles} from '../components/Bubbles';
import classNames from 'html-classnames';
import { version } from '../../package.json';
import {useTranslation} from 'react-i18next';

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const offset = (new Date()).getTimezoneOffset() / -60;

const FooterData = () => {
	const l = useTranslation();

	return (
		<div className="as-footer__data">
			<div className="as-footer__data__item">
				{`${l.t('footer.timezone')}: ${timeZone} (UTC${offset >= 0 ? '+' : ''}${offset})`}
			</div>
			<div className="as-footer__data__item">
				{version}
			</div>
		</div>
	);
};

const getBubblesType = (pathname) => {
	switch (true) {
	case pathname.startsWith('/auth'):
		return 'neutral';
	default:
		return 'success';
	}
};

export const TemplateMain = ({ children }) => {
	const location = useLocation();
	const pathparts = location.pathname.split('/');
	const modifiers = (new Array(pathparts.length)).fill('').reduce((acc, curr, index) => {
		if (index === 0) {
			return acc;
		}

		const key = `-${pathparts.slice(0, index + 1).join('-')}`;
		acc[key] = true;
		return acc;
	}, {});
	const mainClassNames = classNames('as-main', modifiers);

	const bubblesType = getBubblesType(location.pathname);
	return (
		<>
			<header className="as-header">
				<Container>
					<nav>
						<ul className="as-nav-menu">
							<li>
								<Link to="/">
									<img src="/slug-red.svg" alt="AgentSlug.com logo - vector image with a shape of snail." className="as-nav-menu__logo"/>
								</Link>
							</li>
						</ul>
					</nav>
				</Container>
			</header>
			<main className={mainClassNames}>
				{children}
			</main>
			<footer className="as-footer">
				<FooterData />
			</footer>
			<Bubbles type={bubblesType}/>
		</>
	);
};
