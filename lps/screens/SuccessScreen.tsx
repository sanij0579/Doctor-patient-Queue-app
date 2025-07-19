import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>✅ Booking Successful!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 22,
    color: 'green',
  },
});