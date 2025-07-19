import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LocationBar() {
  return (
    <TouchableOpacity style={styles.container}>
      <MaterialIcons name="location-on" size={24} color="#2563eb" />
      <View style={styles.textContainer}>
        <Text style={styles.label}>Your Location</Text>
        <Text style={styles.address} numberOfLines={1}>
          123 Main Street, New York, NY
        </Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#94a3b8" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    fontSize: 12,
    color: '#64748b',
  },
  address: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
});