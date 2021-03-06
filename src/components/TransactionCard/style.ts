import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
    type: 'up' | 'down'
}

export const Container = styled.View`
    padding: 20px 24px;
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    margin-bottom: ${RFValue(15)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ type, theme }) => 
        type === 'up' ? theme.colors.success : theme.colors.attention
    };
    font-size: ${RFValue(20)}px;
    margin-bottom: ${RFValue(27)}px;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
    margin-right: 10px;
`;

export const CategoryName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const Date = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
`;