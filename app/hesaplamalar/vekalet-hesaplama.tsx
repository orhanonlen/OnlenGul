// app/hesaplamalar/vekalet-hesaplama.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VekaletHesaplamaScreen() {
  const navigation = useNavigation();

  // Form state'leri
  const [tutar, setTutar] = useState<string>(""); // "TUTAR GİRİNİZ"
  const [konu, setKonu] = useState<"para" | "icraTakip">("para");
  const [modalMahkemeVisible, setModalMahkemeVisible] = useState(false);
  const [mahkeme, setMahkeme] = useState<string>("asliye"); // Varsayılan: Asliye Mahkemeleri

  // Sonuçlar
  const [sonuc, setSonuc] = useState<string>("");
  const [sonucDetay, setSonucDetay] = useState<string>("");

  // Mahkeme seçenekleri ve maktu değerler (2025 tarifesine göre)
  const mahkemeOptions = [
    { label: "İcra Mahkemeleri", value: "icra" },
    { label: "Sulh Hukuk Mahkemeleri", value: "sulhHukuk" },
    { label: "Sulh Ceza/İnfaz Hakimlikleri", value: "sulhCeza" },
    { label: "Asliye Mahkemeleri", value: "asliye" },
    { label: "Tüketici Mahkemeleri", value: "tuketici" },
    { label: "Fikri ve Sınai Haklar Mahkemeleri", value: "fikri" },
    { label: "İdare Duruşmasız", value: "idareDurusmasiz" },
    { label: "İdare Duruşmalı", value: "idareDurusmali" },
  ];

  // Her mahkeme için maktu vekalet ücreti (2025)
  const courtConfig: { [key: string]: { flatFee: number } } = {
    icra: { flatFee: 12000 },
    sulhHukuk: { flatFee: 18000 },
    sulhCeza: { flatFee: 13500 },
    asliye: { flatFee: 30000 },
    tuketici: { flatFee: 15000 },
    fikri: { flatFee: 40000 },
    idareDurusmasiz: { flatFee: 18000 },
    idareDurusmali: { flatFee: 36000 },
  };

  // Ortak oran: 400.000 TL üzeri için dilimli hesaplamada kullanılan oranlar (tüm mahkemeler için aynıdır)
  const tiers = [
    { limit: 400000, rate: 0.16 },
    { limit: 400000, rate: 0.15 },
    { limit: 800000, rate: 0.14 },
    { limit: 1200000, rate: 0.11 },
    { limit: 1600000, rate: 0.08 },
    { limit: 2000000, rate: 0.05 },
    { limit: 2400000, rate: 0.03 },
    { limit: 2800000, rate: 0.02 },
    { limit: Infinity, rate: 0.01 },
  ];

  // Tiered hesaplama fonksiyonu (dava değeri 400.000 TL ve üzeri için)
  function calculateTieredFee(amount: number): number {
    let remaining = amount;
    let fee = 0;
    for (let i = 0; i < tiers.length; i++) {
      const tierAmount = Math.min(remaining, tiers[i].limit);
      fee += tierAmount * tiers[i].rate;
      remaining -= tierAmount;
      if (remaining <= 0) break;
    }
    return fee;
  }

  // "Konusu para" için maktu hesaplaması (mahkemeye göre özel mantık):
  // Her mahkeme için:
  // 1. Eğer dava değeri < flatFee → fee = dava değeri.
  // 2. Eğer flatFee ≤ dava değeri ≤ (flatFee/0.16) → fee = flatFee.
  // 3. Eğer (flatFee/0.16) < dava değeri < 400.000 TL → fee = (dava değeri * 0.16).
  // 4. Eğer dava değeri ≥ 400.000 TL → tiered hesaplama uygulanır.
  function calculateMaktuFee(court: string, caseValue: number): number {
    const config = courtConfig[court];
    if (!config) return caseValue;
    const flatFee = config.flatFee;
    const threshold = flatFee / 0.16; // Örneğin asliye: 30000/0.16 = 187500 TL

    if (caseValue < flatFee) {
      return caseValue;
    } else if (caseValue <= threshold) {
      return flatFee;
    } else if (caseValue < 400000) {
      return caseValue * 0.16;
    } else {
      return calculateTieredFee(caseValue);
    }
  }

  // "İcra Takipleri" için hesaplama (daha önceki tiered hesaplama yöntemi uygulanıyor)
  function calculateIcraTakipFee(caseValue: number): number {
    return calculateTieredFee(caseValue);
  }

  // Hesaplama fonksiyonu
  const hesapla = () => {
    const sayiTutar = parseFloat(tutar.replace(",", ".")) || 0;
    let hesaplanan = 0;

    if (konu === "para") {
      hesaplanan = calculateMaktuFee(mahkeme, sayiTutar);
    } else {
      hesaplanan = calculateIcraTakipFee(sayiTutar);
    }

    setSonuc(`${hesaplanan.toFixed(2)} TL`);
    const detayMetni =
      `VEKALET HESAP DÖKÜMÜ\n` +
      `---------------------------\n` +
      `Tutar: ${sayiTutar.toFixed(2)} TL\n` +
      `Konu: ${konu === "para" ? "Konusu Para Olan Davalar" : "İcra Takipleri"}\n` +
      (konu === "para"
        ? `Mahkeme: ${mahkemeOptions.find(opt => opt.value === mahkeme)?.label}\n`
        : ""
      ) +
      `---------------------------\n` +
      `Toplam Vekalet Ücreti: ${hesaplanan.toFixed(2)} TL\n`;

    setSonucDetay(detayMetni);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Tutar Girişi */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>TUTAR (TL):</Text>
            <TextInput
              style={styles.input}
              placeholder="TUTAR GİRİNİZ"
              keyboardType="numeric"
              value={tutar}
              onChangeText={setTutar}
            />
          </View>
          {/* KONUSU Seçimi */}
          <View style={[styles.fieldContainer, styles.radioContainer]}>
            <Text style={styles.label}>KONUSU:</Text>
            <TouchableOpacity style={styles.radioOption} onPress={() => setKonu("para")}>
              <View style={styles.radioCircle}>
                {konu === "para" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Konusu Para Olan Davalar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioOption} onPress={() => setKonu("icraTakip")}>
              <View style={styles.radioCircle}>
                {konu === "icraTakip" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>İcra Takipleri</Text>
            </TouchableOpacity>
          </View>
          {/* Eğer konu "para" ise, mahkeme seçimi */}
          {konu === "para" && (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mahkeme Seçimi:</Text>
              <TouchableOpacity style={styles.pickerButton} onPress={() => setModalMahkemeVisible(true)}>
                <Text style={styles.pickerButtonText}>
                  {mahkemeOptions.find(opt => opt.value === mahkeme)?.label ?? "Mahkeme Seç"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Mahkeme Seçimi Modal */}
          <Modal
            visible={modalMahkemeVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalMahkemeVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={mahkemeOptions}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setMahkeme(item.value);
                        setModalMahkemeVisible(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalMahkemeVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* Hesapla Butonu */}
          <TouchableOpacity style={styles.button} onPress={hesapla}>
            <Text style={styles.buttonText}>HESAPLAMA YAP</Text>
          </TouchableOpacity>
          {/* Sonuç Ekranı */}
          <Text style={styles.resultLabel}>Toplam Vekalet Ücreti:</Text>
          <Text style={styles.resultText}>{sonuc}</Text>
          <Text style={styles.detailsLabel}>Ayrıntılı Hesap Dökümü:</Text>
          <Text style={styles.details}>{sonucDetay}</Text>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000035',
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  fieldContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#000035',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000035',
    borderRadius: 5,
    padding: 8,
    color: '#000035',
  },
  radioContainer: {
    flexDirection: 'column',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000035',
    borderRadius: 10,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    backgroundColor: '#000035',
    borderRadius: 6,
  },
  radioLabel: {
    fontSize: 14,
    color: '#000035',
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#000035',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#000035',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
    color: '#000035',
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 8,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#2A5C82',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2A5C82',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000035',
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#000035',
    marginVertical: 5,
  },
  detailsLabel: {
    fontSize: 14,
    color: '#000035',
    marginTop: 10,
  },
  details: {
    fontSize: 12,
    backgroundColor: '#e6e6e6',
    color: '#000035',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
});
