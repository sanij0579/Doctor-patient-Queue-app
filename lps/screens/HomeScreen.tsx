import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';
import type { RootStackParamList, MainTabsParamList } from '../types/navigation';

const services = [
  { id: 1, title: 'ENT Specialist', image: require('../assets/images/ENT Specialist.jpg') },
  { id: 2, title: 'Pediatrician', image: require('../assets/images/Pediatrician2.jpg') },
  { id: 3, title: 'Orthopedic Specialist', image: require('../assets/images/Orthopedic Specialist.jpg') },
  { id: 4, title: 'gynecologist', image: require('../assets/images/Gynecologist.jpg') },
  { id: 5, title: 'General Physician', image: require('../assets/images/General Physician.jpg') },
  { id: 6, title: 'Dermatologist', image: require('../assets/images/Dermatologist.jpg') },
  { id: 7, title: 'Cardiologist', image: require('../assets/images/Cardiologist.jpg') },
  { id: 8, title: 'Psychiatrist', image: require('../assets/images/Psychiatrist.jpg') },
  { id: 9, title: 'Covid-19 Specialist', image: require('../assets/images/Covid-19 Specialist.jpg') },
  { id: 10, title: 'Emergency Care', image: require('../assets/images/Emergency Care.jpg') },
];

const sliderImages = [
  require('../assets/images/banner.jpg'),
  require('../assets/images/banner2.jpg'),
  require('../assets/images/banner5.jpg'),
  require('../assets/images/banner6.jpg'),
];

const featuredDoctors = [
  {
    name: 'Dr. Radhika Sharma',
    specialty: 'Gynecologist • 12+ yrs exp',
    rating: '⭐ 4.8 (120 reviews)',
    image: require('../assets/images/Gynecologist.jpg'),
    review: {
      name: '👩 Anjali Verma',
      text: 'The doctor was very polite and explained everything clearly.',
    },
  },
  {
    name: 'Dr. Vivek Malhotra',
    specialty: 'Cardiologist • 18+ yrs exp',
    rating: '⭐ 4.7 (98 reviews)',
    image: require('../assets/images/Cardiologist.jpg'),
    review: {
      name: '👨 Rajeev Kumar',
      text: 'Very professional and gave clear advice. Booking process was smooth.',
    },
  },
  {
    name: 'Dr. Aarti Nair',
    specialty: 'Pediatrician • 10+ yrs exp',
    rating: '⭐ 4.9 (140 reviews)',
    image: require('../assets/images/Pediatrician.jpg'),
    review: {
      name: '👩 Seema Joshi',
      text: 'My baby received great care. Doctor was calm and friendly.',
    },
  },
];

const offers = [
  "🩺 Get 20% off on your first doctor consultation!",
  "⚡ Book appointments instantly with top specialists!",
  "👶 Free prenatal checkup with maternity packages!",
  "🏥 Save ₹200 on home visit consultations this month!",
];

function DynamicAnnouncement() {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex(prev => (prev + 1) % offers.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.announcementContainer}>
      <Text style={styles.announcementText}>{offers[currentOfferIndex]}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MainTabs'>>();
  const [searchText, setSearchText] = useState('');

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationHeader}>
          <Text style={styles.locationTitle}>AIIMS Hospital</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationSubtitle}>Ansari Nagar, New Delhi – 110029</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>
        {/* cart button */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            navigation.navigate('MainTabs', { screen: 'Cart' as keyof MainTabsParamList })
          }
        >
          <MaterialIcons name="shopping-cart" size={24} color="#1e293b" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for 'A Doctor'"
          placeholderTextColor="#94a3b8"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Slider */}
        <View style={styles.sliderContainer}>
          <Swiper autoplay autoplayTimeout={3} showsPagination dotColor="#cbd5e1" activeDotColor="#1e293b">
            {sliderImages.map((img, index) => (
              <Image key={index} source={img} style={styles.sliderImage} />
            ))}
          </Swiper>
        </View>

        {/* Dynamic Announcement */}
        <DynamicAnnouncement />

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {filteredServices.map(service => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() =>
                navigation.navigate('ServiceDetails', {
                  serviceId: service.id,
                  title: service.title,
                  image: service.image,
                })
              }
            >
              <Image source={service.image} style={styles.serviceImage} />
              <Text style={styles.serviceTitle}>{service.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Doctor + Review Slider */}
        <View style={styles.sliderSection}>
          <Swiper
            autoplay
            autoplayTimeout={4}
            showsPagination
            dotColor="#cbd5e1"
            activeDotColor="#1e293b"
            height={220}
          >
            {featuredDoctors.map((doc, index) => (
              <View key={index} style={styles.slideCard}>
                <View style={styles.doctorCard}>
                  <Image source={doc.image} style={styles.doctorImage} />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doc.name}</Text>
                    <Text style={styles.doctorSpecialty}>{doc.specialty}</Text>
                    <Text style={styles.doctorRating}>{doc.rating}</Text>
                  </View>
                </View>
                <View style={styles.reviewCard}>
                  <Text style={styles.reviewName}>{doc.review.name}</Text>
                  <Text style={styles.reviewText}>{doc.review.text}</Text>
                </View>
              </View>
            ))}
          </Swiper>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/images/banner3.jpg')} style={styles.bannerImage} />
        </View>

        {/* Footer */}
        <View style={styles.footerBig}>
          <View style={styles.footerSectionRow}>
            <View style={styles.footerColumn}>
              <Text style={styles.footerHeading}>Company</Text>
              <Text style={styles.footerLink}>About Us</Text>
              <Text style={styles.footerLink}>Careers</Text>
              <Text style={styles.footerLink}>Press</Text>
              <Text style={styles.footerLink}>SmartClinic Blog</Text>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerHeading}>Support</Text>
              <Text style={styles.footerLink}>Help Center</Text>
              <Text style={styles.footerLink}>Contact Us</Text>
              <Text style={styles.footerLink}>Privacy Policy</Text>
              <Text style={styles.footerLink}>Terms & Conditions</Text>
            </View>
          </View>

          <View style={styles.footerSectionRow}>
            <View style={styles.footerColumn}>
              <Text style={styles.footerHeading}>Top Specialties</Text>
              <Text style={styles.footerLink}>Gynecologist</Text>
              <Text style={styles.footerLink}>Cardiologist</Text>
              <Text style={styles.footerLink}>ENT Specialist</Text>
              <Text style={styles.footerLink}>Pediatrician</Text>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerHeading}>Contact</Text>
              <Text style={styles.footerLink}>📍 Delhi, India</Text>
              <Text style={styles.footerLink}>📞 +91-9876543210</Text>
              <Text style={styles.footerLink}>✉️ support@smartclinic.in</Text>
            </View>
          </View>

          <Text style={styles.footerCredit}>
            Made with ❤️ by Sani Jain • SmartClinic ©2025
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// styles remain unchanged

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  locationHeader: { flex: 1 },
  locationTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  locationButton: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationSubtitle: { fontSize: 14, color: '#64748b', marginRight: 4 },
  cartButton: { position: 'relative', padding: 8 },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchInput: { flex: 1, paddingVertical: 12, marginLeft: 8, fontSize: 16 },
  content: { flex: 1 },
  sliderContainer: {
    height: 180,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  announcementContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fef3c7',
    borderBottomWidth: 1,
    borderColor: '#fde68a',
  },
  announcementText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  serviceCard: {
    width: '50%',
    padding: 8,
  },
  serviceImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1e293b',
    marginTop: 12,
  },
  bannerContainer: { padding: 10 },
  bannerImage: {
    width: '100%',
    height: 225,
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
  },
  sliderSection: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  slideCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  doctorInfo: { flex: 1 },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#64748b',
    marginVertical: 2,
  },
  doctorRating: {
    fontSize: 13,
    color: '#16a34a',
  },
  reviewCard: {
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
  },
  reviewName: {
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 13,
    color: '#334155',
  },
  footer: {
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 12,
  },
  footerBig: {
  backgroundColor: '#ffffff',
  paddingVertical: 20,
  paddingHorizontal: 16,
  borderTopWidth: 1,
  borderColor: '#e5e7eb',
  marginTop: 20,
},
footerSectionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
},
footerColumn: {
  flex: 1,
  marginRight: 10,
},
footerHeading: {
  fontSize: 14,
  fontWeight: '700',
  color: '#1e293b',
  marginBottom: 8,
},
footerLink: {
  fontSize: 13,
  color: '#475569',
  marginBottom: 4,
},
footerCredit: {
  textAlign: 'center',
  color: '#1b55a7ff',
  fontSize: 12,
  marginTop: 12,
},
sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 16,
  },
card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },


});