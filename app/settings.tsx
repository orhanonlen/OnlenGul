// app/settings.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>
      <Text style={styles.paragraph}>
        Burada tema değiştirme, profil güncelleme, çıkış vb. özellikler olabilir.
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
