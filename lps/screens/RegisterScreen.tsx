// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerPatient } from '../api/api';

type Props = {
  onSuccess: () => void;
};

// ✅ Add response type
type RegisterResponse = {
  id: number;
  name: string;
  phone: string;
};

export default function RegisterScreen({ onSuccess }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const doctorId = 1; // 🔁 Replace with actual doctor ID if needed

  const handleRegister = async () => {
    if (!name || !phone) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      // ✅ Type the response
      const data = await registerPatient(name, phone, doctorId) as RegisterResponse;

      await AsyncStorage.setItem('patientId', String(data.id));
      await AsyncStorage.setItem('doctorId', String(doctorId));

      const tokenRes = await fetch('http://10.47.92.81:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'sanij0579@gmail.com',
          password: 'sani jain'
        })
      });

      const tokenData = await tokenRes.json();

      if (tokenRes.status !== 200 || !tokenData.access) {
        Alert.alert('Token fetch failed');
        console.error(tokenData);
        return;
      }

      await AsyncStorage.setItem('accessToken', tokenData.access);

      // 🔁 Success callback
      onSuccess();
    } catch (error) {
      Alert.alert('Registration failed');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Registration</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8
  }
});