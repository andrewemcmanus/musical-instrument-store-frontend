import Link from 'next/Link';
import styled from 'styled-components';
import Nav from './Nav';
// import Cart from './Cart

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    z-index;
    background: red;
    transform: skew(-7deg);
    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
    }
`;

// Scoped styles
const HeaderStyles = styled.header`
    .bar {
        border-bottom: 10px solid var(--black, black);
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
    }

    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid var(--black, black);
    }
`;
// CONTEXT AND LOCAL STATE: passing down from above in a different way
export default function Header() {
    return (
        <HeaderStyles>
            <div className="bar">
                <Logo>
                    <Link href="/">
                        Musical Instruments
                    </Link>
                </Logo>
                <Nav />
            </div>
            <div className="sub-bar">
                <p>Search</p>
            </div>
            <Cart />
        </HeaderStyles>
    )
}