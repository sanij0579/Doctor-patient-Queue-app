import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';
import { MaterialIcons } from '@expo/vector-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import BookingsScreen from './screens/BookingsScreen';
import OffersScreen from './screens/OffersScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import ServiceDetails from './screens/ServiceDetails';
import FeatureDetailScreen from './screens/FeatureDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';

// Context
import { CartProvider } from './contexts/CartContext';

// Navigation Types
import { RootStackParamList } from './types/navigation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  LTS: 'home',
  Bookings: 'description',
  Rewards: 'card-giftcard',
  OurShop: 'shopping-bag',
  Account: 'person',
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 66,
          backgroundColor: 'white',
          borderTopColor: '#e2e8f0',
        },
        tabBarIcon: ({ color }) => {
          const iconName = iconMap[route.name] || 'circle';
          return <MaterialIcons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="LTS" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Ask-AI" component={OffersScreen} />
      <Tab.Screen name="Status" component={ChatScreen} />
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <CartProvider>
            <Toaster />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MainTabs" component={TabNavigator} />
              <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
              <Stack.Screen name="FeatureDetailScreen" component={FeatureDetailScreen} />
              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
              
              <Stack.Screen name="QueueScreen" component={require('./screens/QueueScreen').default} />
            </Stack.Navigator>
          </CartProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});