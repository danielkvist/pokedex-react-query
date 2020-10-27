import React, { FC } from 'react';
import { useQuery } from 'react-query';

import { fetchStats } from './api';

interface PkmnStats {
	spriteUrl: string;
	name: string;
	id: number;
	pokedex: string;
	types: [string, string | undefined];
}

const formatStats = (data: any): PkmnStats => {
	return {
		spriteUrl: data.sprites.front_default,
		name: data.name,
		id: data.id,
		pokedex: `${data.id}`.padStart(4, '0'),
		types: [
			data.types[0].type.name,
			data.types.length > 1 ? data.types[1].type.name : undefined,
		],
	};
};

interface Props {
	url: string;
}

const Pokemon: FC<Props> = ({ url }) => {
	const { data, isLoading, isError } = useQuery(['pokemon', url], fetchStats, {
		staleTime: Infinity,
	});

	if (isLoading) return <p>Loading</p>;
	if (isError) return <p>Error</p>;

	const stats = formatStats(data);

	return (
		<section className="card">
			<header className="card__header">
				<img
					className="sprite"
					src={stats.spriteUrl}
					alt={`${stats.name} sprite.`}
				/>
			</header>
			<main className="card__body">
				<p className="number">#{stats.pokedex}</p>
				<p className="name">{stats.name}</p>
				<div className="types">
					<span className="type" data-type={stats.types[0]}>
						{stats.types[0]}
					</span>
					{stats.types[1] && (
						<span className="type" data-type={stats.types[1]}>
							{stats.types[1]}
						</span>
					)}
				</div>
			</main>
		</section>
	);
};

export default Pokemon;
