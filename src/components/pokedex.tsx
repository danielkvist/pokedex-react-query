import React, { FC, useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';

interface Pokemon {
	name: string;
	url: string;
}

const fetchPkmn = async (_: string, offset: number) => {
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon?offset=${offset * 10}&limit=10`
	);
	return res.json();
};

const Pokedex: FC = () => {
	const [offset, setOffet] = useState<number>(0);
	const [data, setData] = useState<Pokemon[]>([]);
	const {
		resolvedData,
		latestData,
		isLoading,
		isError,
		isFetching,
	} = usePaginatedQuery(['pokemons', offset], fetchPkmn, {
		staleTime: Infinity,
	});

	useEffect(() => {
		if (isFetching) return;
		setData((old) => [...old, ...resolvedData.results]);
	}, [setData, isFetching, resolvedData]);

	if (isLoading || isFetching) return <p>Loading</p>;
	if (isError) return <p>Error fetching data</p>;
	if (isError) return <p>Fetching data</p>;

	return (
		<div>
			<button
				onClick={() => {
					setOffet(offset + 1);
				}}
				disabled={!latestData || !latestData.next}
			>
				More
			</button>
			{data.length &&
				data.map((pkmn: Pokemon) => {
					return <p key={pkmn.name}>{pkmn.name}</p>;
				})}
		</div>
	);
};

export default Pokedex;
