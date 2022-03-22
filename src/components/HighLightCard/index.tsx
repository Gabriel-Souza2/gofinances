import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTrasition
} from './style';

interface Props {
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransition: string;
}

const icons = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign"
};

export function HighLightCard({ 
    type,
    title,
    amount,
    lastTransition
 }: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icons[type]} type={type}/>
            </Header>
            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTrasition type={type}>{lastTransition}</LastTrasition>
            </Footer>
        </Container>
    );
}