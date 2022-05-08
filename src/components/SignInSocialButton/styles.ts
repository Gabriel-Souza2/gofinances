import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;

    height: ${RFValue(56)}px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.shape};


    margin-bottom: 16px;

`; 

export const ImageContainer = styled.View`
    margin-right: ${RFValue(62)}px;
    padding: ${RFValue(16)}px;

    border-color: ${({ theme }) => theme.colors.background};
    border-right-width: 1px;
`;
 
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;