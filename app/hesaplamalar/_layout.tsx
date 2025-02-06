import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Link, Slot } from 'expo-router'; 
// Dikkat: "Slot" import edilerek expo-router'ın child route'ları yönetmesine izin vereceğiz.
import { useNavigation } from '@react-navigation/native';

export default function HesaplamalarLayout() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.customHeader}>
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={[styles.headerText, styles.backButtonText]}>Geri</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.tabContainer}>
          <Link href="/hesaplamalar/harc-hesaplama" asChild>
            <TouchableOpacity style={styles.tabItem}>
              <Text style={[styles.headerText, styles.activeTabText]}>
                Harç Hesaplama
              </Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.separator} />

          <Link href="/hesaplamalar/vekalet-hesaplama" asChild>
            <TouchableOpacity style={styles.tabItem}>
              <Text style={[styles.headerText, styles.inactiveTabText]}>
                Vekalet Hesaplama
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Önemli Kısım: Artık sabit <HarcHesaplamaScreen /> koymak yerine <Slot /> koyuyoruz. */}
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A5C82',
  },
  customHeader: {
    backgroundColor: '#2A5C82',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    paddingVertical: 5,
    paddingRight: 10,
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.5)',
  },
  backButtonText: {},
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  tabItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 5,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#bbb',
  },
  separator: {
    width: 1,
    height: '70%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
