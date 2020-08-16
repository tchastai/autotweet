import React, { useEffect } from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from "react-redux";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import LoginView from "./Login/LoginView";
import TrendsView from "./Trends/TrendsView";
import { RootState, useAppDispatch } from '../store/index'
import { AccessTokenState, checkToken } from '../store/login'
import WorkflowsView from "./Workflows/WorkflowsView";
import { Colors } from "../constants";
import { getAccountInfo } from "../store/trends";

const Tab = createBottomTabNavigator();

const tabBarOptions = {
    activeTintColor: Colors.WHITE,
    inactiveTintColor: Colors.SECONDARY_LABEL
}

const tabScreenOptions = {
    Trends: {
        tabBarIcon: ({ color }: any) => (
            <MaterialIcons name="assessment" size={24} color={color} />
        ),
    },
    Workflows: {
        tabBarIcon: ({ color }: any) => (
            <MaterialCommunityIcons name="arrow-decision" size={24} color={color} />
        )
    }
}

export function Navigation() {
    const hasAccessToken = useSelector(
        (state: RootState) => state.login.accessToken
    ) === AccessTokenState.Found

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkToken())
    }, [])

    useEffect(() => {
        if (hasAccessToken) {
            dispatch(getAccountInfo())
        }
    }, [hasAccessToken])

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={DarkTheme}>
                {
                    hasAccessToken ?
                        (
                            <Tab.Navigator tabBarOptions={tabBarOptions}>
                                <Tab.Screen name="Trends" component={TrendsView} options={tabScreenOptions.Trends} />
                                <Tab.Screen name="Workflows" component={WorkflowsView} options={tabScreenOptions.Workflows} />
                            </Tab.Navigator>
                        ) :
                        (
                            <LoginView />
                        )
                }
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default Navigation