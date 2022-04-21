import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
    Container,
    ActivityIndicatorContainer,
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

interface HighLightProps {
    amount: string;
    lastTransaction: string;
}

interface HighLightData {
    entries: HighLightProps,
    expansives: HighLightProps,
    total: HighLightProps
}
export function Dashboard() {

    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsListProps[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

    function getLastTransaction(collection: TransactionsListProps[], type: 'up' | 'down' ) {
        const lastTransaciton = new Date (Math.max.apply(Math, collection
            .filter((transaction: TransactionsListProps) => transaction.type === type)
            .map((transaction: TransactionsListProps) => new Date(transaction.date).getTime())));

        return `${lastTransaciton.getDate()} de ${lastTransaciton.toLocaleString('pt-BR', {'month': 'long'})}`;
    
    }

    async function loadTransactions() {
        let entriesTotal = 0;
        let expansivesTotal = 0;
        const transactions = await StoreTransancions.get();

        const transactionsFormatted: TransactionsListProps[] = transactions.map(
            (item: TransactionsListProps) => {
                item.type === 'up' ? entriesTotal += Number(item.amount) : 
                                     expansivesTotal += Number(item.amount);

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

        const total = entriesTotal - expansivesTotal;

        const lastTransactionsEntries = getLastTransaction(transactions, 'up');
        const lastTransactionsExpansives = getLastTransaction(transactions, 'down');
        const totalInterval = `01 a ${lastTransactionsExpansives}`;

        setTransactions(transactionsFormatted);
        setHighLightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionsEntries}`
            },
            expansives: {
                amount: expansivesTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saida dia ${lastTransactionsExpansives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        });
        
        setIsLoading(false);

        

    }

    useEffect(() => {
        loadTransactions();
    }, []);
    
    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading ? 
                
                    <ActivityIndicatorContainer>
                        <ActivityIndicator color={theme.colors.primary} size="large" />
                    </ActivityIndicatorContainer> 
                :
                <>
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
                                amount={highLightData.entries.amount}
                                lastTransition={highLightData.entries.lastTransaction}
                        />
                        <HighLightCard 
                                type="down"
                                title="Saídas"
                                amount={highLightData.expansives.amount}
                                lastTransition={highLightData.expansives.lastTransaction}
                        />
                        <HighLightCard 
                                type="total"
                                title="Total"
                                amount={highLightData.total.amount}
                                lastTransition={highLightData.total.lastTransaction}
                        />
                    </HighLightCards>

                    <Transactions>
                        <TransactionTitle>Listagem</TransactionTitle>
                            
                        <TransactionsList 
                            data={transactions}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                            keyExtractor={ item => item.id}
                        />

                    </Transactions>
                </>
            }
        </Container>
    );
}