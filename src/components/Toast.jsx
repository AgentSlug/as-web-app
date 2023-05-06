import React, {useEffect, useState} from 'react';
import {useToastStore} from '../data/createStore';
import classNames from 'html-classnames';
import {useTranslation} from 'react-i18next';

export const Toast = () => {
	const l = useTranslation();
	const toastState = useToastStore();
	const hasNext = !!toastState.getNext();
	const currentToast = toastState.getCurrent();
	const [hiding, setHiding] = useState(false);

	const className = classNames('as-toast__content', {
		'--visible': hiding || currentToast !== null,
		'--hiding': hiding,
	});

	useEffect(() => {
		if (hiding) {
			setTimeout(() => {
				toastState.didHide();
				setHiding(false);
			}, 600);
		}
	}, [hiding]);

	useEffect(() => {
		if (!hiding && hasNext) {
			setHiding(true);
		}
	}, [hasNext, hiding]);

	window.foo = toastState;

	return (
		<div className="as-toast">
			<div
				className={className}
				aria-live="assertive"
			>
				<div className="as-toast__content__message">
					{currentToast?.message}
				</div>
				<div className="as-toast__content__actions">
					<button
						className="as-btn"
						type="button"
						onClick={() => setHiding(true)}
					>
						{l.t('common.ok')}
					</button>
				</div>
			</div>
		</div>
	);
};
