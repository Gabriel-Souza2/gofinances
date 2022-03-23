import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";


interface IconType {
    type: 'up' | 'down';
}

interface ContainerProps {
    type: 'up' | 'down';
    isActive: boolean;
}

interface TtileProps {
    isActive: boolean
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    padding: 16px 36px;

    border: ${({ isActive, type }) => isActive ? 0 : 1.5}px 
            solid ${({ theme }) => theme.colors.text_light};
    
    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `};
`;

export const Icon = styled(Feather)<IconType>`
    font-size: ${RFValue(24)}px;
    margin-right: 14px;
    color: ${({ theme, type }) => 
        type === 'up' ? theme.colors.success : theme.colors.attention
    };
`;

export const Title = styled.Text<TtileProps>`
    color: ${({ theme, isActive }) => isActive ? theme.colors.text_dark : theme.colors.text};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

