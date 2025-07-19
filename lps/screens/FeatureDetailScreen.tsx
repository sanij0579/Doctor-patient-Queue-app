import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { featureDetails } from '../configs/featureConfigs';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import RegisterScreen from './RegisterScreen';
import DoctorReviewSwiper from '../components/DoctorReviewSwiper';

const { width } = Dimensions.get('window');

export default function FeatureDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { featureName, serviceTitle } = route.params as {
    featureName: string;
    serviceTitle?: string;
  };

  const feature = featureDetails[featureName];

  if (!feature) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.title}>Feature not found</Text>
      </View>
    );
  }

  const handleRegisterSuccess = () => {
    navigation.navigate('CheckoutScreen', {
      featureName: feature.title,
      selectedTime: 'N/A',
    });
  };

  return (
    <View style={styles.wrapper}>
      {/* 🔙 Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        {/* 🧑‍⚕️ Doctor Header */}
        <View style={styles.headerSection}>
          <Image source={feature.image} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{feature.title}</Text>
            <Text style={styles.specialty}>{feature.specialty}</Text>
            <Text style={styles.hospital}>Grace Women's Clinic</Text>
          </View>
        </View>

        {/* 🔰 Badges */}
        <View style={styles.badgesRow}>
          <Badge icon="event" text={`Experience: ${feature.experience}`} />
          <Badge icon="star" text={`Rating: ${feature.rating}/5`} />
          <Badge icon="medical-services" text={`Specialty: ${feature.specialty}`} />
          <Badge icon="schedule" text={`Duration: ${feature.duration}`} />
          <Badge icon="currency-rupee" text={`Fee: ₹${feature.Fee}`} />
        </View>

        <DoctorReviewSwiper />
        {/* 📃 Description + Form */}
        <View style={styles.content}>
          <Text style={styles.description}>{feature.description}</Text>
          <RegisterScreen onSuccess={handleRegisterSuccess} />
        </View>
      </ScrollView>

      {/* 🦶 Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by SmartClinic 💙</Text>
      </View>
    </View>
  );
}

function Badge({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.badge}>
      <MaterialIcons name={icon} size={16} color="#555" />
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingBottom: 120, // Space for footer
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#18191aff',
    padding: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    marginLeft: 20,
    paddingTop: 80,
    backgroundColor: '#f8f9fa',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  headerText: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  specialty: {
    fontSize: 14,
    color: '#727f92ff',
  },
  hospital: {
    fontSize: 14,
    color: '#0ea5e9',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d8e0e8ff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    margin: 4,
  },
  badgeText: {
    fontSize: 13,
    marginLeft: 6,
    color: '#334155',
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    color: '#475569',
  },
 footer: {
  marginTop: 40,
  alignItems: 'center',
  marginBottom: 20,
},
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
  },
});