import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
    return {
        keyArgs: false, // tells Apollo that we'll take care of everything
        // existing = the existing items
        read(existing = [], { args, cache }) {
            const { skip, first } = args;

            // Read the number of items on the page from the cache:
            // grab PAGINATION_QUERY from Pagination.js (exported there)
            const data = cache.readQuery({ query: PAGINATION_QUERY });
            const count = data?._allProductsMeta?.count;
            const page = skip / first + 1;
            const pages = Math.ceil(count / first);
            // check if we have existing items...
            const items = existing.slice(skip, skip + first).filter((x) => x);
            // if 1. there are items AND 2. there aren't enough items to satisfy how many were requested
            // AND 3. we're on the last page, THEN just send it
            // *** this solves the last page error ***
            if(items.length && items.length !== first && page === pages) {
                return items;
            }
            if(items.length != first) {
                // we don't have any items, so we must fetch them from the network
                return false;
            }
            // if there are items, return them (don't return to the network)
            if(items.length) {
                console.log(
                    `There are ${items.length} items in the cache. Sending them to Apollo`
                );
                return items;
            }
            return false; // fallback to network

            // First thing Apollo does is to ask the Read function for the items.
            // We can then do one of two things:
            // 1. return the items, because they're already in the cache
            // 2. return false from here, then => run a network request...
        },
        merge(existing, incoming, { args }) {
            const { skip, first } = args;
            // This runs when the Apollo client comes back from the network with our product(s).
            console.log(`Merging ${incoming.length} items from the network.`);
            const merged = existing ? existing.slice(0): [];
            for (let i = skip; i < skip + incoming.length; i++) {
                merged[i] = incoming[i - skip];
            };
            return merged;
        },
    }
}