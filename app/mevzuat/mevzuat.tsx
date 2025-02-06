import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

type RootStackParamList = {
  LawDetail: {
    lawId: string;
    title: string;
    content: string;
  };
};

// Kanun Listesi
const laws = [
  { id: 'tmk', title: 'Türk Medeni Kanunu', iconName: 'balance-scale', content: 'Türk Medeni Kanunu metni...' },
  { id: 'tck', title: 'Türk Ceza Kanunu', iconName: 'exclamation-circle', content: 'Türk Ceza Kanunu metni...' },
  { id: 'ttk', title: 'Türk Ticaret Kanunu', iconName: 'briefcase', content: 'Türk Ticaret Kanunu metni...' },
  { id: 'ik', title: 'İcra ve İflas Kanunu', iconName: 'folder-open', content: 'İcra ve İflas Kanunu metni...' },
  { id: 'muk', title: 'Medeni Usul Kanunu', iconName: 'file-alt', content: 'Medeni Usul Kanunu metni...' },
  { id: 'iyuk', title: 'İdari Yargılama Usulü Kanunu', iconName: 'university', content: 'İdari Yargılama Usulü Kanunu metni...' },
  { id: 'isk', title: 'İş Kanunu', iconName: 'industry', content: 'İş Kanunu metni...' },
  { id: 'tkk', title: 'Tüketiciyi Koruma Kanunu', iconName: 'shopping-cart', content: 'Tüketiciyi Koruma Kanunu metni...' },
  { id: 'fsek', title: 'Fikir ve Sanat Eserleri Kanunu', iconName: 'paint-brush', content: 'Fikir ve Sanat Eserleri Kanunu metni...' },
  { id: 'bekh', title: 'Bilgi Edinme Hakkı Kanunu', iconName: 'info-circle', content: 'Bilgi Edinme Hakkı Kanunu metni...' },
];

export default function MevzuatListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [anayasaContent, setAnayasaContent] = useState('Yükleniyor...');

  useEffect(() => {
    async function loadAnayasa() {
      try {
        // anayasa.txt dosyasını app/assets klasöründen import ediyoruz.
        const anayasaAsset = Asset.fromModule(require('../assets/anayasa.txt'));
        await anayasaAsset.downloadAsync();

        if (!anayasaAsset.localUri) {
          console.error("❌ Anayasa dosyası bulunamadı.");
          return;
        }

        const text = await FileSystem.readAsStringAsync(anayasaAsset.localUri);
        setAnayasaContent(text);
      } catch (error) {
        console.error('⚠️ Anayasa metni yüklenirken hata oluştu:', error);
      }
    }

    loadAnayasa();
  }, []);

  const renderItem = ({ item }: { item: typeof laws[0] | { id: 'anayasa'; title: string; iconName: string; content: string } }) => (
    <TouchableOpacity
      style={styles.bannerItem}
      onPress={() => navigation.navigate('LawDetail', {
        lawId: item.id,
        title: item.title,
        content: item.id === 'anayasa' ? anayasaContent : item.content,
      })}
    >
      <FontAwesome5 name={item.iconName} size={30} color="#fff" style={styles.icon} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ id: 'anayasa', title: 'Anayasa', iconName: 'gavel', content: anayasaContent }, ...laws]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A5C82',
    padding: 10,
  },
  listContent: {
    paddingVertical: 10,
  },
  bannerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  icon: {
    marginRight: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
