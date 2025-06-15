import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import LeavesScreen from '../screens/LeavesScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={() => {
            return {
                headerShown: false,
                tabBarActiveTintColor: '#e91e63',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#fff' },
            };
        }}
        >
            <Tab.Screen 
                name="Leaves" 
                component={LeavesScreen} 
                options={{
                    tabBarLabel: 'Leaves',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Logout" 
                component={LogoutScreen} 
                options={{
                    tabBarLabel: 'Logout',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={color} />
                    ),
                }} 
            />   
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;