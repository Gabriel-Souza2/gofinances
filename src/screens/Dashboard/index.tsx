import React from 'react';
import { HighLightCard } from '../../components/HighLightCard';

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
    HighLightCards
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
                <HighLightCard/>
                <HighLightCard/>
                <HighLightCard/>
            </HighLightCards>
        </Container>
    );
}