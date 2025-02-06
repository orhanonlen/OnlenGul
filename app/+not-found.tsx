// app/+not-found.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // TouchableOpacity ekleyin
import { useRouter } from '@react-navigation/native'; // useRouter'ı buradan import edin

export default function NotFoundScreen() {
  const router = useRouter(); // useRouter'ı kullanın

  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Sayfa Bulunamadı</Text>
      <Text style={styles.subtitle}>Aradığınız sayfa mevcut değil.</Text>
      {/* Geri dön butonu ekleyin */}
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/home')}>
        <Text style={styles.buttonText}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  button: { // Buton stilleri
    marginTop: 20,
    backgroundColor: '#2A5C82',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: { // Buton metni stilleri
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});