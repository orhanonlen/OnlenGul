// anayasascreen.js

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export default function AnayasaScreen() {
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("Modern anayasascreen.js dosyası yüklendi");
    async function loadAnayasa() {
      try {
        // assets klasöründeki anayasa.txt dosyasını yükleyin.
        const asset = Asset.fromModule(require('../assets/anayasa.txt'));
        await asset.downloadAsync();
        const text = await FileSystem.readAsStringAsync(asset.localUri || '');
        setContent(text);
        // Dosya içeriğini satırlara bölerek, boş satırları filtreleyin.
        const lines = text.split('\n').filter(line => line.trim() !== '');
        setArticles(lines);
      } catch (error) {
        console.error('Anayasa metni yüklenirken hata oluştu:', error);
      }
    }
    loadAnayasa();
  }, []);

  // Arama sorgusuna göre maddeleri filtreleyin.
  const filteredArticles = articles.filter(article =>
    article.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Text style={styles.cardText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: 'yellow', fontSize: 30, textAlign: 'center' }}>TEST: Modern Anayasa Ekranı</Text>
      <Text style={styles.header}>Anayasa Maddeleri</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Madde ara..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredArticles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A5C82', // Home.tsx ile uyumlu arka plan rengi
    padding: 10,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  searchBar: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)', // Arama çubuğu için hafif şeffaf arka plan
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Kart için okunabilir arka plan
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 22,
  },
});
