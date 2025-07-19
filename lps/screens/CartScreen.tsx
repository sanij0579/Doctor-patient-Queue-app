// screens/CheckoutScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

export default function CheckoutScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { featureName, selectedTime } = route.params as {
    featureName: string;
    selectedTime: string;
  };

  // 👇 Auto-navigate after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('QueueScreen');
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animation/Calendar Success Add.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />

      <Text style={styles.title}>Booking Confirmed 🎉</Text>
      <Text style={styles.subText}>Service: {featureName}</Text>
      <Text style={styles.subText}>Time Slot: {selectedTime}</Text>
      <Text style={styles.success}>We’ll see you soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  lottie: {
    width: width * 0.7,
    height: width * 0.7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 20,
  },
  subText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  success: {
    fontSize: 16,
    marginTop: 20,
    color: '#888',
  },
});