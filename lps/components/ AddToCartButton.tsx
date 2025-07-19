// components/AddToCartButton.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../contexts/CartContext';

const AddToCartButton = ({ item }: { item: any }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const cartItem = cart.find(ci => ci.id === item.id);

  return (
    <View style={styles.container}>
      {cartItem ? (
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{cartItem.quantity}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart({ ...item, quantity: 1 })}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddToCartButton;