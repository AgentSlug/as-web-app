import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Container} from '../components/Container';
import {Bubbles} from "../components/Bubbles";
import classNames from "html-classnames";


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
				<Container>
					foxoter
				</Container>
			</footer>
			<Bubbles />
		</>
	);
};
