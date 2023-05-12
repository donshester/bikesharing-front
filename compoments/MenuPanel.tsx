import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';

const Tab = createBottomTabNavigator();

export default function TabBar() {
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
