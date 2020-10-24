import React, { FC, useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';

import Pokemon from './pokemon';

const fetchPkmns = async (_: string, offset: number) => {
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon?offset=${offset * 12}&limit=12`
	);
	return res.json();
};

const Pokedex: FC = () => {
	const [offset] = useState<number>(0);
	const [data, setData] = useState<{ name: string; url: string }[]>([]);
	const { resolvedData, isLoading, isError, isFetching } = usePaginatedQuery(
		['pokemons', offset],
		fetchPkmns,
		{
			staleTime: Infinity,
		}
	);

	useEffect(() => {
		if (isFetching) return;
		setData((old) => [...old, ...resolvedData.results]);
	}, [setData, isFetching, resolvedData]);

	if (isLoading || isFetching) return <p>Loading</p>;
	if (isError) return <p>Error fetching data</p>;

	return (
		<>
			{data.length &&
				data.map((pkmn) => {
					return <Pokemon key={pkmn.name} url={pkmn.url} />;
				})}
		</>
	);
};

export default Pokedex;
