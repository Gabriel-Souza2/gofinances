import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Button,
    Title,
    Icon,
} from './style';

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
}

interface Props extends RectButtonProps {
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
        <Container type={type} isActive={isActive}>
            <Button {...rest}>
                <Icon name={icon[type]} type={type}/>
                <Title isActive={isActive}>
                    {title}
                </Title>
            </Button>
        </Container>
    );
}