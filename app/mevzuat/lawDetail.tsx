import React, { useState, useMemo } from 'react';
import { ScrollView, Text, StyleSheet, TextInput, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MevzuatStackParamList } from './_layout';

type Props = StackScreenProps<MevzuatStackParamList, 'LawDetail'>;

export default function LawDetailScreen({ route }: Props) {
  const { title, content } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  // Kanun metnini satırlara ayırıyoruz
  const contentLines = useMemo(() => content.split('\n'), [content]);

  // Arama sorgusuna göre filtreleme (arama alanı boşsa tüm satırları göster)
  const filteredLines = useMemo(() => {
    if (!searchQuery) return contentLines;
    const query = searchQuery.toLowerCase();
    return contentLines.filter(line => line.toLowerCase().includes(query));
  }, [searchQuery, contentLines]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Kanun maddesi ara..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.contentWrapper}>
        {filteredLines.map((line, index) => (
          <Text key={index} style={styles.contentText}>{line}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2A5C82',
  },
  searchInput: {
    height: 40,
    borderColor: '#2A5C82',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  contentWrapper: {
    marginBottom: 20,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#000',
    marginBottom: 5,
  },
});
