import React, { FC } from 'react';
import { useQuery } from 'react-query';

const fetchPokemonStats = async (_: string, url: string) => {
	const res = await fetch(url);
	return res.json();
};

interface Props {
	url: string;
}

const Pokemon: FC<Props> = ({ url }) => {
	const { data, isLoading, isError } = useQuery(
		['pokemon', url],
		fetchPokemonStats,
		{
			staleTime: Infinity,
		}
	);

	if (isLoading) return <p>Loading</p>;
	if (isError) return <p>Error fetching data</p>;

	return (
		<section className="card">
			<header className="card__header">
				<img
					className="sprite"
					src={data.sprites.front_default}
					alt={`${data.name} sprite.`}
				/>
				<span className="number">{data.id}</span>
			</header>
			<main className="card__body">
				<div className="types">
					<span className="type type--1">{data.types[0].type.name}</span>
					{data.types.lenght > 1 && (
						<span className="type type--2">data.types[1].type.name</span>
					)}
				</div>
				<p className="height">{data.height}cm</p>
				<p className="weight">{data.weight}kg</p>
			</main>
		</section>
	);
};

export default Pokemon;
