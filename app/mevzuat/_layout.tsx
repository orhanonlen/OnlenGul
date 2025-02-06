// MevzuatLayout.tsx (veya .js)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MevzuatListScreen from './mevzuat';
import LawDetailScreen from './lawDetail';

export type MevzuatStackParamList = {
  MevzuatList: undefined;
  LawDetail: { lawId: string; title: string; content: string };
};

const Stack = createStackNavigator<MevzuatStackParamList>();

const headerBackgroundColor = '#1a3b59'; // Koyu renk. Kendi renginizle değiştirin.

export default function MevzuatLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: headerBackgroundColor },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerBackTitleVisible: false, // BU SATIR ÇOK ÖNEMLİ!
        headerLeftContainerStyle: { paddingLeft: 10 },
      }}
    >
      <Stack.Screen
        name="MevzuatList"
        component={MevzuatListScreen}
        options={({ navigation }) => ({
          title: 'Mevzuat',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.headerLeftText}>&lt; Geri</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="LawDetail"
        component={LawDetailScreen}
        options={({ route, navigation }) => ({
          title: route.params.title,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.headerLeftText}>&lt; Geri</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLeftText: {
    color: 'white',
    fontSize: 16,
  },
});