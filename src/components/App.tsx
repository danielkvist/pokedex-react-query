import React, { FC } from 'react';

import Pokedex from './pokedex';

const App: FC = () => {
	return (
		<>
			<header className="header">
				<h1 className="title">Pokedex Query</h1>
			</header>
			<main className="main">
				<Pokedex />
			</main>
		</>
	);
};

export default App;
