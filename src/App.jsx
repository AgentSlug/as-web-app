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
	const userStore = useUserStore();
	const handleLogout = () => userStore.logout();
	return (
		<>
			<h1>Dashboard</h1>
			<button onClick={handleLogout}>Logout</button>
		</>
	);
};

const useMainStoreWatcher = () => {
	const navigate = useNavigate();
	const location  = useLocation();
	const userStore = useUserStore();
	useEffect(() => {
		if (!userStore.fetched) {
			userStore.init();
			return () => {};
		}
		if (!userStore.loggedIn && location.pathname.startsWith('/auth') === false) {
			navigate('/auth');
		}
		if (userStore.loggedIn && location.pathname.startsWith('/auth')) {
			navigate('/');
		}
	}, [userStore, location, navigate]);
};


const RoutesView = () => {
	useMainStoreWatcher();
	const userStore = useUserStore();
	if (!userStore.fetched) {
		return <p>Loading</p>;
	}
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
