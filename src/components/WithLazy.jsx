import React, { Suspense } from 'react';

export const WithLazy = ({importer}) => {
	const LazyComponent = React.lazy(importer);
	return (
		<Suspense fallback={null}>
			<LazyComponent />
		</Suspense>
	);
};
