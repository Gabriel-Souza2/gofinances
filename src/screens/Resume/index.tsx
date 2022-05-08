import React, { useEffect, useState, useCallback } from 'react';
import { VictoryPie } from "victory-native";
import { ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { HistoryCard } from '../../components/HistoryCard';
import { StoreTransancions } from '../../services/store-transactions';
import { categories } from '../../util/categories';

import { TransactionsListProps } from '../Dashboard';

import {
    Container,
    Header,
    Title,
    MonthSelect,
    MonthButton,
    MonthButtonIcon,
    Month,
    Content,
    ActivityIndicatorContainer
} from './styles';

interface CategoryData {
    key: string;
    name: string,
    color: string,
}

interface TotalByCategory {
    key: string;
    name: string;
    total: number;
    totalFormatted: string,
    color: string;
    percent: string;
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<TotalByCategory[]>([]);

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev') {
        setIsLoading(true)
        if (action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData(){
        const transactions = await StoreTransancions.get();

        const expansives = transactions
        .filter((transaction : TransactionsListProps) => 
            transaction.type === 'down'  &&
            new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
            new Date(transaction.date).getMonth() === selectedDate.getMonth()
        );

        

        const expansivesTotal = expansives.reduce((accumulator: number, expansive: TransactionsListProps) => {
                return accumulator + Number(expansive.amount);
            }, 0);

        const totalByCategory: TotalByCategory[] = [];

        categories.forEach((category: CategoryData) => {

            let categorySum = 0;

            expansives.forEach((transaction: TransactionsListProps) => {
                transaction.categoryKey === category.key ? categorySum += Number(transaction.amount) : "";
            });

            if(categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const percent = `${(categorySum / expansivesTotal * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent
                });
            }

        });

        
       setTotalByCategories(totalByCategory);
       setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));
    return (
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>
            <Content contentContainerStyle={{
                flexGrow: 1,
                padding: 24,
                paddingBottom: useBottomTabBarHeight(),
                alignItems: 'center',
            }}
            >
                <MonthSelect>
                    <MonthButton onPress={() => handleDateChange('prev')}>
                        <MonthButtonIcon name="chevron-left" />
                    </MonthButton>
                    <Month>
                        {
                            format(selectedDate, 'MMMM-yyyy', {locale: ptBR})
                        }
                    </Month>
                    <MonthButton onPress={() => handleDateChange('next')}>
                        <MonthButtonIcon name="chevron-right" />
                    </MonthButton>
                </MonthSelect>
                {
                    isLoading ? 
                            <ActivityIndicatorContainer>
                                <ActivityIndicator color={theme.colors.primary} size="large" />
                            </ActivityIndicatorContainer> 
                        :
                            <VictoryPie 
                                data={totalByCategories}
                                colorScale={totalByCategories.map(item => item.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: theme.colors.shape
                                    }
                                }}
                                labelRadius={50}
                                x="percent"
                                y="total"
                            />
                            
                }
                {
                    isLoading ? 
                        <></>
                    : 
                        totalByCategories.map(item => (
                            <HistoryCard 
                                key={item.key}
                                name={item.name}
                                amount={item.totalFormatted}
                                color={item.color}
                            />
                        )) 
                
                }
              
            </Content>
        </Container>
    );
}

