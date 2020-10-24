import React, { FC } from 'react';

import Pokedex from './pokedex';

const App: FC = () => {
	return (
		<div className="App">
			<header>
				<h1>Pokedex Query</h1>
			</header>
			<main>
				<Pokedex />
			</main>
			<footer></footer>
		</div>
	);
};

export default App;
