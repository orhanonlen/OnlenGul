import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const modules = [
  {
    id: '1',
    title: 'Dosyalarım',
    route: '/documents',
    icon: <Ionicons name="folder-open" size={24} color="white" />,
  },
  {
    id: '2',
    title: 'Vekaletnameler',
    route: '/documents',
    icon: <MaterialCommunityIcons name="file-document-multiple" size={24} color="white" />,
  },
  {
    id: '3',
    title: 'Duruşma Listesi',
    route: '/calendar',
    icon: <Ionicons name="calendar" size={24} color="white" />,
  },
  {
    id: '4',
    title: 'Görevlerim',
    route: '/tasks',
    icon: <Ionicons name="list" size={24} color="white" />,
  },
  {
    id: '5',
    title: 'Masraf Takip',
    route: '/explore',
    icon: <MaterialCommunityIcons name="cash-multiple" size={24} color="white" />,
  },
  {
    id: '6',
    title: 'Hesaplamalar',
    route: '/hesaplamalar/harc-hesaplama',
    icon: <FontAwesome5 name="book" size={24} color="white" />,
  },

 {
  id: '7',
  title: 'Mevzuat',
  route: '/mevzuat', // uygun route
  icon: <FontAwesome5 name="book" size={24} color="white" />,
  },
];

export default function HomeScreen() {
  const router = useRouter(); // useRouter doğru şekilde expo-router'dan import edildi
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(1);

  useFocusEffect(
    React.useCallback(() => {
      if (navigation) {
        navigation.setOptions({
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
              <Text style={{ color: 'white', fontSize: 16 }}>Geri</Text>
            </TouchableOpacity>
          ),
        });
      }
      return () => {
        if (navigation) {
          navigation.setOptions({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 16 }}>Geri</Text>
              </TouchableOpacity>
            ),
          });
        }
      };
    }, [navigation])
  );

  const handlePress = (item: { route: string }) => {
    router.push(item.route);
  };

  const renderBanner = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.bannerContainer} onPress={() => handlePress(item)}>
      <View style={styles.bannerContent}>
        {item.icon}
        <Text style={styles.bannerTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Logo için View */}
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/onlengul-logo.png')} style={styles.logo} />
      </View>

      <FlatList
        data={modules}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A5C82',
    paddingTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 210,
    height: 210,
    resizeMode: 'contain',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  bannerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '97%',
    marginLeft: '1.5%',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 15,
  },
});
