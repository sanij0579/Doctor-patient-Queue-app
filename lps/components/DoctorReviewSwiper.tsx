import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';

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

export default function DoctorReviewSwiper() {
  return (
    <View style={styles.sliderSection}>
      <Swiper autoplay autoplayTimeout={4} showsPagination dotColor="#cbd5e1" activeDotColor="#1e293b" height={220}>
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
  );
}

const styles = StyleSheet.create({
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
});