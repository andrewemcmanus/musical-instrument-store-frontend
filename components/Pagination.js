import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Head } from "next/Document";
import { perPage } from "../next.config";
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
                <title></title>
            </Head>

        </PaginationStyles>
    )
}