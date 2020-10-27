import React, { FC, Fragment, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { fetchPkmns } from './api';
import useIntersectionObserver from '../hooks/use-intersection-observer';
import Pokemon from './pokemon';

const Pokedex: FC = () => {
	const {
		data,
		status,
		fetchMore,
		canFetchMore,
		isFetchingMore,
	} = useInfiniteQuery('pokemons', fetchPkmns, {
		getFetchMore: (last) => last.next,
		staleTime: Infinity,
	});
	const loadMore = useRef(null);

	useIntersectionObserver({
		target: loadMore,
		onIntersect: fetchMore,
		enabled: canFetchMore,
	});

	return status === 'loading' ? (
		<p>Loading</p>
	) : status === 'error' ? (
		<p>Error</p>
	) : (
		<>
			{data &&
				data.map((group, i) => (
					<Fragment key={i}>
						{group.results.map((pkmn: { name: string; url: string }) => (
							<Pokemon key={pkmn.name} url={pkmn.url} />
						))}
					</Fragment>
				))}
			<button
				className="load-more"
				ref={loadMore}
				onClick={() => fetchMore()}
				disabled={!canFetchMore}
			>
				{isFetchingMore ? 'Loading...' : 'Load more'}
			</button>
		</>
	);
};

export default Pokedex;
