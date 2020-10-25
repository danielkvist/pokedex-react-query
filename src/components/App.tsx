import React, { FC } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import Pokedex from './pokedex';

const App: FC = () => {
	const queryCache = new QueryCache();

	return (
		<>
			<header className="header">
				<h1 className="title">Pokedex Query</h1>
			</header>
			<main className="main">
				<ReactQueryCacheProvider queryCache={queryCache}>
					<Pokedex />
				</ReactQueryCacheProvider>
			</main>
		</>
	);
};

export default App;
