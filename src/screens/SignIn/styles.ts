import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    width: 100%;
`;

export const Header = styled.View`
    justify-content: flex-end;
    align-items: center;

    height:${RFPercentage(70)}px;
    background-color:  ${({ theme }) => theme.colors.primary};
`;

export const TitleWraper = styled.View`
    align-items: center;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(30)}px;
    text-align: center;
    margin-top:  ${RFValue(40)}px;
    margin-bottom: ${RFValue(80)}px;
`;

export const SubTitle = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
    text-align: center;
    margin-bottom:  ${RFValue(67)}px;
`;

export const Footer = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    height: ${RFPercentage(40)}px;
    align-items: center;
`;

export const FooterWraper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    width: ${RFValue(311)}px;
`;