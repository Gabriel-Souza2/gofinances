import React from 'react';
import { categories } from '../../util/categories';

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './style';

export interface TransactionCardProps {
    type: 'up' | 'down';
    name: string;
    amount: string;
    categoryKey: string;
    date: string;
}

interface Props {
    data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
    const [ category ] = categories.filter(category => category.key === data.categoryKey);
    return (
        <Container>
            <Title>
                { data.name }
            </Title>
            <Amount type={data.type}>
                {data.type === 'down' ? '- ' : ''}
                { data.amount }
            </Amount>
            <Footer>
                <Category>
                    <Icon 
                        name={category.icon}
                    />
                    <CategoryName>
                        { category.name }
                    </CategoryName>
                </Category>
                <Date>
                    { data.date }
                </Date>
            </Footer>
        </Container>
    );
}
