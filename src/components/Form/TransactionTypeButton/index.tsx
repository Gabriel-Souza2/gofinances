import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Title,
    Icon,
} from './style';

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
}

interface Props extends TouchableOpacityProps {
    type: 'up' | 'down';
    title: string;
    isActive: boolean;
}

export function TransactionTypeButton({
    type,
    title,
    isActive,
    ...rest
}: Props) {
    return (
        <Container {...rest} type={type} isActive={isActive}>
            <Icon name={icon[type]} type={type}/>
            <Title isActive={isActive}>
                {title}
            </Title>
        </Container>
    );
}