import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DoctorReviewSwiper from '../components/DoctorReviewSwiper';

const BASE_URL = 'http://10.47.92.81:8000/api';

type QueueStatusResponse = {
  current_number: number;
  your_number: number;
  estimated_wait_minutes: number;
};

export default function QueueScreen() {
  const navigation = useNavigation();
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [yourNumber, setYourNumber] = useState<number | null>(null);
  const [waitTime, setWaitTime] = useState<number | null>(null);

  const fetchStatus = async () => {
    try {
      const doctorId = await AsyncStorage.getItem('doctorId');
      const patientId = await AsyncStorage.getItem('patientId');
      const token = await AsyncStorage.getItem('accessToken');

      if (!doctorId || !patientId || !token) {
        console.warn('⚠️ Missing doctorId, patientId, or accessToken');
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/status/${doctorId}/${patientId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { current_number, your_number, estimated_wait_minutes } =
        response.data as QueueStatusResponse;

      setCurrentNumber(current_number);
      setYourNumber(your_number);
      setWaitTime(estimated_wait_minutes);

      if (your_number === current_number) {
        Alert.alert("✅ It's your turn!", "Please proceed to the doctor.");
      } else if (your_number - current_number <= 2 && estimated_wait_minutes > 0) {
        Alert.alert("🚨 Be Ready!", `You're up in ${estimated_wait_minutes} minutes.`);
      }
    } catch (error) {
      console.error('❌ Error fetching queue status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ ...styles.container, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1, width: '100%' }}>
        {/* 🔙 Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>📍 Queue Status</Text>

        {/* Queue Info Card */}
        <View style={styles.card}>
          <Text style={styles.label}>👨‍⚕️ Current Number</Text>
          <Text style={styles.value}>{currentNumber ?? '-'}</Text>

          <Text style={styles.label}>🧍‍♂️ Your Number</Text>
          <Text style={styles.value}>{yourNumber ?? '-'}</Text>

          <Text style={styles.label}>⏳ Estimated Wait</Text>
          <Text style={styles.value}>
            {waitTime === 0
              ? "You're up next!"
              : waitTime
              ? `${waitTime} minutes`
              : '-'}
          </Text>
        </View>

        {/* 🔄 Refresh Button */}
        <TouchableOpacity style={styles.refreshBtn} onPress={fetchStatus}>
          <Text style={styles.refreshText}>🔄 Refresh Now</Text>
        </TouchableOpacity>

        {/* 👨‍⚕️ Doctor + Patient Review Swiper */}
        <DoctorReviewSwiper />

        {/* ✅ Info Footer */}
        <View style={styles.infoFooter}>
          <MaterialIcons name="info" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.infoFooterText}>
            You will be notified as your turn approaches. Please wait patiently.
          </Text>
        </View>

        {/* 🦶 Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 SmartClinic | Stay Healthy 💙</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#dde4eaff',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#212122ff',
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    padding: 24,
    backgroundColor: '#ebe5e5ff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginTop: 16,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 6,
  },
  refreshBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 24,
    alignSelf: 'center',
  },
  refreshText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoFooter: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    width: '100%',
  },
  infoFooterText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
  },
});