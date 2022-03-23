import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../../global/styles/theme"

export const Container = styled.TextInput.attrs({
    placeholderTextColor: theme.colors.text
})`
    width: 100%;
    height: ${RFValue(56)}px;
    padding: 16px 18px;
    background-color: ${({ theme }) => theme.colors.shape};
    color: ${({ theme }) => theme.colors.title};
    border-radius: 5px;
    margin-bottom: 8px;

    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;