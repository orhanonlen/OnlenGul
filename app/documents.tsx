// app/documents.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function DocumentsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Geri Butonu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Geri</Text>
      </TouchableOpacity>

      {/* Dokümanlar Başlık ve İçerik */}
      <Text style={styles.title}>Dijital Doküman Arşivi</Text>
      <Text style={styles.paragraph}>
        Burada belgelerin dijital olarak saklanması, kategori/dosya numarası, OCR vb. özellikler
        bulunacaktır.
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
  backButton: {
    alignSelf: 'flex-start', // Butonu sol üst köşeye hizala
    backgroundColor: '#2A5C82',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 16,
    marginTop: 20, // Üstten biraz boşluk bırak
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: '600',
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
