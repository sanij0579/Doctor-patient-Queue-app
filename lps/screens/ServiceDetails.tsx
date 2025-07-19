import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { serviceFeatureImages } from '../constants/serviceFeatureImages';
import { serviceData } from '../configs/serviceConfigs';

type ServiceDetailsRouteProp = RouteProp<RootStackParamList, 'ServiceDetails'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'ServiceDetails'>;

export default function ServiceDetails() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ServiceDetailsRouteProp>();
  const { serviceId, title, image } = route.params;

  const selectedService = serviceData.find(
    (service) => service.id === Number(serviceId)
  );

  if (!selectedService) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Service not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ position: 'relative' }}>
        <Image source={image} style={styles.image} />

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <View style={styles.bottomOverlay}>
          <Text style={styles.overlayTitle}>{title}</Text>
        </View>
      </View>

      <Text style={styles.description}>{selectedService.description}</Text>

      <Text style={styles.sectionTitle}>Our Services</Text>
      <View style={styles.servicesGrid}>
        {selectedService.features.map((featureName, index) => (
          <TouchableOpacity
            key={index}
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate('FeatureDetailScreen', {
                featureName,
                serviceTitle: selectedService.title,
              })
            }
          >
            <Image
              source={
                serviceFeatureImages[featureName] ||
                require('../assets/images/banner.jpg')
              }
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>{featureName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  overlayTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  serviceCard: {
    width: '45%',
    backgroundColor: '#f8f8f8',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  serviceImage: {
    width: '100%',
    height: 100,
  },
  serviceTitle: {
    padding: 10,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});