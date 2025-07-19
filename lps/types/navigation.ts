// types/navigation.ts

// ✅ Main stack navigation
export type RootStackParamList = {
  MainTabs: { screen: keyof MainTabsParamList } | undefined;

  // Service category and feature navigation
  ServiceDetails: {
    serviceId: number;
    title: string;
    image: any;
  };

  FeatureDetailScreen: {
    featureName: string;
    serviceTitle?: string;
  };

  // Booking flow
  CheckoutScreen: {
    featureName: string;
    selectedTime: string;
  };

  QueueScreen: undefined; // ✅ Navigate here after booking success

  // Shop
  CartScreen: undefined;
};

// ✅ Bottom tab navigation
export type MainTabsParamList = {
  LTS: undefined;
  Bookings: undefined;
  Rewards: undefined;
  OurShop: undefined;
  Account: undefined;
  Cart: undefined;
};