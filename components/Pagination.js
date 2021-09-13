import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Head } from "next/Document";
// import Head from 'next/head';
import Link from "next/Link";
import { perPage } from "../next.config";
import DisplayError from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        allProductsMeta {
            count
        }
    }
`;

export default function Pagination({ page }) {
    const { error, loading, data } = useQuery(PAGINATION_QUERY);

    if(loading) return 'Loading...';
    if(error) return <DisplayError error={error} />;
    // round up to highest int:
    // fixed count: **destructured** 
    //   => (THIS IS WHAT CREATED OBJECTS NOT VALID AS REACT CHILD ERROR)
    const { count } = data._allProductsMeta;
    const pageCount = Math.ceil(count / perPage)
    return (
        <PaginationStyles>
            <Head>
                <title>Musical Instruments - Page {page} pf {pageCount}</title>
            </Head>
{/* A weird quirk of Next.js: you have to use <a> tags for attributes other than href */}
            <Link href={`/products/${page - 1}`}>
                <a aria-disabled={page <= 1}>Prev</a>
            </Link>
                <p>Page {page} of {pageCount}</p>
                <p>Total Items: {count}</p>
            <Link href={`/products/${page + 1}`}>
                <a aria-disabled={page >= pageCount}>Next</a>
            </Link>
        </PaginationStyles>
    )
}