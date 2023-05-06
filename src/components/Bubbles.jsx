import React from 'react';
import classNames from "html-classnames";

export const Bubbles = ({ type }) => {
	const className = classNames('bubbles', {
		'--neutral': type === 'neutral',
		'--success': type === 'success',
	});

	return (
		<svg
			id="bubbles"
			className={className}
			clipRule="evenodd"
			fillRule="evenodd"
			strokeLinejoin="round"
			strokeMiterlimit="2"
			viewBox="0 0 2250 2250"
			preserveAspectRatio="xMidYMid slice"
			xmlns="http://www.w3.org/2000/svg"
		>
			<clipPath id="a">
				<path clipRule="evenodd" d="m0 0h2250v2250h-2250z"/>
			</clipPath>
			<clipPath id="c">
				<path clipRule="evenodd" d="m0 0h2250v2250h-2250z"/>
			</clipPath>
			<clipPath id="e">
				<path clipRule="evenodd" d="m0 0h2250v2250h-2250z"/>
			</clipPath>
			<path d="m0 0h2250v2250h-2250z" className="bubbles__bg"/>
			<g clipPath="url(#a)" className="bubbles__bottom-left">
				<circle cx="129.567" cy="1979.17" r="483.322"/>
			</g>
			<g clipPath="url(#c)" className="bubbles__top">
				<circle cx="484.917" cy="265.203" r="703.297"/>
			</g>
			<g clipPath="url(#e)" className="bubbles__bottom-right">
				<circle cx="2127.83" cy="1783.75" r="879.504"/>
			</g>
		</svg>
	);
};
