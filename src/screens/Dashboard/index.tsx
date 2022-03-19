import React from 'react';

import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard } from '../../components/TransactionCard';

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
    TransactionTitle
} from './style';

export function Dashboard() {
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
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />

            </Transactions>
        </Container>
    );
}