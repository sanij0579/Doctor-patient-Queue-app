import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

type MenuItem = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
};

export default function ProfileScreen() {
  const menuItems: MenuItem[] = [
    { icon: 'person-outline', title: 'Personal Details' },
    { icon: 'location-on', title: 'Saved Addresses' },
    { icon: 'payment', title: 'Payment Methods' },
    { icon: 'history', title: 'Service History' },
    { icon: 'help-outline', title: 'Help & Support' },
    { icon: 'settings', title: 'Settings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarPlaceholder}>
            <MaterialIcons name="person" size={40} color="#94a3b8" />
          </View>
          <Text style={styles.name}>Sani Jain</Text>
          <Text style={styles.phone}>+1 234 567 8900</Text>
        </View>
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.menuItem}
              activeOpacity={0.7}
              accessibilityRole="button"
            >
              <MaterialIcons name={item.icon} size={24} color="#2563eb" />
              <Text style={styles.menuText}>{item.title}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#64748b',
  },
  menuList: {
    backgroundColor: 'white',
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#1e293b',
  },
});