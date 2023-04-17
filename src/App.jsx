import React, {useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import {
	BrowserRouter,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import {useUserStore} from './data/createStore';
import {WithLazy} from './components/WithLazy';
import {TemplateMain} from './views/Templates';
import './lang.js';
const AuthView = () => import('./views/AuthView');

const DashboardView = () => {
	return <h1>Dashboard</h1>;
};

const useMainStoreWatcher = () => {
	const navigate = useNavigate();
	const location  = useLocation();
	const user = useUserStore();

	useEffect(() => {
		if (!user.fetched) {
			user.init();
		}
		if (!user.loggedIn && location.pathname.startsWith('/auth') === false) {
			navigate('/auth');
		}
		if (user.loggedIn && location.pathname.startsWith('/auth')) {
			navigate('/');
		}
	}, [user, location, navigate]);
};


const RoutesView = () => {
	useMainStoreWatcher();
	return (
		<Routes>
			<Route path="/" element={<DashboardView />} />
			<Route path="/auth/*" element={<WithLazy importer={AuthView} />} />
		</Routes>
	);
};

const App = () => {
	return (
		<BrowserRouter>
			<TemplateMain>
				<RoutesView />
			</TemplateMain>
		</BrowserRouter>
	);
};

const main = () => {
	const root = createRoot(document.getElementById('root'));
	root.render(<App />);
};

main();
