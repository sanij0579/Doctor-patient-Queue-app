// /components/BottomSheetCart.tsx
import React, { useMemo, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';

const BottomSheetCart = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%'], []);
  const { totalAmount } = useCart();
  const navigation = useNavigation();

  const handleViewCart = () => {
    navigation.navigate('Cart' as never); // Or define "Cart" in your navigator properly
  };

  return (
    <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total: ₹{totalAmount}</Text>
        <Button title="View Cart" onPress={handleViewCart} />
      </View>
    </BottomSheet>
  );
};

export default BottomSheetCart;