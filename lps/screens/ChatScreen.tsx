import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './RegisterScreen';
import QueueScreen from './QueueScreen';

export default function ChatScreen() {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      const patientId = await AsyncStorage.getItem('patientId');
      if (patientId) {
        setIsRegistered(true);
      }
    };
    checkRegistration();
  }, []);

  const handleRegisterSuccess = () => {
    setIsRegistered(true);
  };

  if (!isRegistered) {
    return <RegisterScreen onSuccess={handleRegisterSuccess} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <QueueScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});