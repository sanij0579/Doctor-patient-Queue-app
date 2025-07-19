import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ServiceCardProps {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  price: string;
  onPress: () => void;
  testID?: string;
}

export default function ServiceCard({
  title,
  icon,
  price,
  onPress,
  testID,
}: ServiceCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      testID={testID}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={32} color="#2563eb" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>Starts at {price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: '45%',
    alignItems: 'center',

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android elevation
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 50,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1e293b',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});