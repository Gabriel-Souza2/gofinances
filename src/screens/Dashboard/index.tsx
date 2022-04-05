import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

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
    Button,
    Icon,
    HighLightCards,
    Transactions,
    TransactionTitle,
    TransactionsList
    
} from './style';

import { StoreTransancions } from '../../services/store-transactions';

export interface TransactionsListProps extends TransactionCardProps {
    id: string;
};

export function Dashboard() {

    const [data, setData] = useState<TransactionsListProps[]>([]);

    async function loadTransactions() {
        const transactions = await StoreTransancions.get();

        const transactionsFormatted: TransactionsListProps[] = transactions.map(
            (item: TransactionsListProps) => {
                const amount = Number(item.amount).toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date))

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    categoryKey: item.categoryKey,
                    date
                }
            }
        );

        setData(transactionsFormatted);
        console.log(transactionsFormatted);
    }

    useEffect(() => {
        loadTransactions();
    }, []);
    
    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

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
                    <Button>
                        <Icon name="power" />
                    </Button>
                    
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