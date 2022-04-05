import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

const { Navigator, Screen } = createBottomTabNavigator();

export type GoFinancesRoutesList = {
    Listagem: undefined,
    Cadastrar: undefined,
    Resumo: undefined
}

export function AppRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 72,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }

            }}
        >
            <Screen 
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ color, size }) => 
                        <Feather  name="list" color={color} size={size} />
                    )
                }}
            />
            <Screen 
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ color, size }) => 
                        <Feather  name="dollar-sign" color={color} size={size} />
                    )
                }}
            />
            <Screen 
                name="Resumo"
                component={Register}
                options={{
                    tabBarIcon: (({ color, size }) => 
                        <Feather  name="pie-chart" color={color} size={size} />
                    )
                }}
            />
        </Navigator>
    );
}