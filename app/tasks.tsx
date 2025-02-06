// app/tasks.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yapılacak Görevler</Text>
      <Text style={styles.paragraph}>
        Burada günlük/haftalık görev listesi, ilerleme takibi, öncelik sırası vb. yer alabilir.
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
