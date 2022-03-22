import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import theme from '../../global/styles/theme';

interface TypeProps {
    type: 'up' | 'down' | 'total';
}

const typeColor = {
    up: {
        background: theme.colors.shape,
        icon: theme.colors.success,
        title: theme.colors.title,
        amount: theme.colors.title,
        lastTrasition: theme.colors.text,
    },
    down: {
        background: theme.colors.shape,
        icon: theme.colors.secondary,
        title: theme.colors.title,
        amount: theme.colors.title,
        lastTrasition: theme.colors.text,
    },
    total: {
        background: theme.colors.secondary,
        icon: theme.colors.shape,
        title: theme.colors.shape,
        amount: theme.colors.shape,
        lastTrasition: theme.colors.shape,
    }
}

export const Container = styled.View<TypeProps>`
    width: ${ RFValue(300) }px;

    background-color: ${({ type }) => typeColor[type].background};

    padding: 18px 22px;
    padding-bottom: ${RFValue(42)}px;
    
    margin-right: ${RFValue(16)}px;

    border-radius: 7px;
`;
export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
export const Title = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({ type }) => typeColor[type].title};
    
`;
export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;

    color: ${({ type }) => typeColor[type].icon};
`;
export const Footer = styled.View`
    margin-top: ${RFValue(30)}px;

`;
export const Amount = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;

    color: ${({ type }) => typeColor[type].title};
`;

export const LastTrasition = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;

    color: ${({ type }) => typeColor[type].lastTrasition};
`;