// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Giriş Ekranı */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Giriş ekranında header yok
          animation: 'fade',
        }}
      />

      {/* Hesaplamalar Modülü */}
      <Stack.Screen
        name="hesaplamalar"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />

      {/* Mevzuat Modülü - EKLENDİ! */}
      <Stack.Screen
        name="mevzuat"  // Bu, app/mevzuat dizinine yönlendirir.
        options={{
          headerShown: false, // GEÇİCİ OLARAK EKLENDİ - Sonra kaldıracağız.
        }}
      />

      {/* 404 - Sayfa Bulunamadı */}
      <Stack.Screen
        name="[...missing]"
        options={{
          headerShown: true,
          animation: 'fade',
          headerStyle: { backgroundColor: '#2A5C82' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerTitle: 'Sayfa Bulunamadı',
        }}
      />
    </Stack>
  );
}