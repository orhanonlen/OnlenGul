// app/explore.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.paragraph}>
        Burada farklı modüller veya kütüphanelerle ilgili demo özellikler sunabilirsiniz.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#2A5C82',
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
  },
});
