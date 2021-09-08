import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from 'styled-components';

const Dot = styled.div`

`

export default function CartCount({ count }) {
    return (
        <TransitionGroup>
            <CSSTransition>

            </CSSTransition>
        </TransitionGroup>

    )
}