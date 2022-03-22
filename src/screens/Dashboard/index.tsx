import React from 'react';

import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
    Container,
    Header,
    UserWrapper,
    Photo,
    User,
    UserInfo,
    UserGreatting,
    UserName,
    Icon,
    HighLightCards,
    Transactions,
    TransactionTitle,
    TransactionsList
    
} from './style';

export interface TransactionsListProps extends TransactionCardProps {
    id: string;
};

export function Dashboard() {
    const data: TransactionsListProps[] = [
      {
        id: '1',
        type: 'positive',
        title: 'Desenvolvimento de site',
        amount: 'R$ 12.000,00',
        category: {
            icon: 'dollar-sign', name: 'Vendas'
        },
        date: '13/04/2020'
      },
      {
        id: '2',
        type: 'negative',
        title: 'Hamburgueria Pizzy',
        amount: 'R$ 59,00',
        category: {
            icon: 'coffee', name: 'Alimentação'
        },
        date: '10/04/2020'
      },
      {
        id: '3',
        type: 'negative',
        title: 'Aluguel do apartamento',
        amount: 'R$ 1.200,00',
        category: {
            icon: 'home', name: 'Casa'
        },
        date: '27/03/2020'
      },
    ]
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: "https://avatars.githubusercontent.com/u/19994168?s=400&u=ded5415ddc637e39f0d99d11163ee01c14ac757d&v=4"}}/>
                        <User>
                            <UserGreatting>Olá,</UserGreatting>
                            <UserName>Gabriel</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
            
            <HighLightCards>
                <HighLightCard 
                        type="up"
                        title="Entradas"
                        amount="R$ 17.400,00"
                        lastTransition="Última entrada dia 13 de abril"
                />
                <HighLightCard 
                        type="down"
                        title="Saídas"
                        amount="R$ 1.259,00"
                        lastTransition="Última saída dia 03 de abril"
                />
                <HighLightCard 
                        type="total"
                        title="Total"
                        amount="R$ 16.141,00"
                        lastTransition="01 à 16 de abril"
                />
            </HighLightCards>

            <Transactions>
                <TransactionTitle>Listagem</TransactionTitle>
                    
                <TransactionsList 
                    data={data}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                    keyExtractor={ item => item.id}
                />

            </Transactions>
        </Container>
    );
}