import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login';
import Home from '../screens/home';
import Collect from '../screens/collect';
import Success from '../screens/collect/success';

import { StackProps } from './models';

const stackRoutes = createNativeStackNavigator<StackProps>();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        initialRouteName='Login'
        screenOptions={{
            gestureEnabled: true,
            headerShown: false,
        }}
    >
        <stackRoutes.Screen name='Login' component={Login} options={{ gestureEnabled: false }} />
        <stackRoutes.Screen name='Home' component={Home} options={{ gestureEnabled: false }} />
        <stackRoutes.Screen name='Collect' component={Collect} options={{ gestureEnabled: true }} />
        <stackRoutes.Screen name='Success' component={Success} options={{ gestureEnabled: false }} />
    </stackRoutes.Navigator>
)

export default AppRoutes