import React, { FC } from 'react';
import { useInfiniteQuery } from 'react-query';

import { fetchPkmns } from './api';
import Pokemon from './pokemon';

const Pokedex: FC = () => {
	const {
		data,
		isLoading,
		isFetching,
		status,
		fetchMore,
		canFetchMore,
		isFetchingMore,
	} = useInfiniteQuery('pokemons', fetchPkmns, {
		getFetchMore: (last) => last.next,
		staleTime: Infinity,
	});

	if (isLoading || isFetching) return <p>Loading</p>;
	if (status === 'error') return <p>Error fetching data</p>;

	return (
		<>
			{data &&
				data.map((group) => {
					return group.results.map((pkmn: { name: string; url: string }) => (
						<Pokemon key={pkmn.name} url={pkmn.url} />
					));
				})}
			<button
				onClick={() => fetchMore()}
				disabled={!canFetchMore || !!isFetchingMore}
			>
				{isFetchingMore
					? 'Loading more'
					: canFetchMore
					? 'Load More'
					: 'Nothing more to load'}
			</button>
		</>
	);
};

export default Pokedex;
