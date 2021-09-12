import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/Link";
import styled from "styled-components";

const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY($id: ID!) {
        allOrders: Order(where: { id: $id }) {
            id
            charge
            total
            user {
                id
            }
            items {
                id
                name
                description
                price
                photo {
                    image {
                        publicUrlTransformed
                    }
                }
            }
        }
    }
`

const OrderUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 4rem;
`

function countItemsInOrder(order) {
    return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
    const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
    if(loading) return <p>loading...</p>
    if(error) return <ErrorMessage error={error}></ErrorMessage>
    const { allOrders } = data;
    return (
        <div>
            <Head>
                <title>Your Orders({allOrders.length})</title>
            </Head>
            <h2>You have {allOrders.length} orders!</h2>
            <OrderUl>
                {allOrders.map(order => (
                    <OrderItemStyles>
                        <Link hrek={`/order/{order.id}`}>
                            <a>
                                <div className="order-meta">
                                    
                                </div>
                            </a>
                        </Link>
                    </OrderItemStyles>
                ))}
            </OrderUl>
        </div>
    )
}