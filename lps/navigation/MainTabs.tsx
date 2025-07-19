import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import type { MainTabsParamList } from '../types/navigation';


const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="LTS" component={HomeScreen} />
      
      

      {/* ✅ Cart is hidden from tab bar but accessible */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarButton: () => null, // hides the button from bottom nav
        }}
      />
    </Tab.Navigator>
  );
}