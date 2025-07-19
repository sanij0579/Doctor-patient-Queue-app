import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ServiceDetails from '../screens/ServiceDetails';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import FeatureDetailScreen from '../screens/FeatureDetailScreen';
import QueueScreen from '../screens/QueueScreen'; // ✅ <-- Add this
import MainTabsNavigator from './MainTabs';

import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="FeatureDetailScreen" component={FeatureDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="QueueScreen" component={QueueScreen} /> {/* ✅ Add here */}
    </Stack.Navigator>
  );
}