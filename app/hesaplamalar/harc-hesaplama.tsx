// app/hesaplamalar/harc-hesaplama.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  FlatList,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function HarcHesaplamaScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // Form state'leri
  const [mahkeme, setMahkeme] = useState<string | null>(null);
  const [deger, setDeger] = useState("");
  const [maktu, setMaktu] = useState(false);
  const [tanikcmb, setTanikcmb] = useState("0");
  const [tanikchk, setTanikchk] = useState(false);
  const [tarafcmb, setTarafcmb] = useState("1");
  const [bilirkisicmb, setBilirkisicmb] = useState("0");
  const [avukatcmb, setAvukatcmb] = useState("0");
  const [bilirkisichk, setBilirkisichk] = useState(false);
  const [kesifchk, setKesifchk] = useState(false);
  const [sonuc, setSonuc] = useState("");
  const [sonucekrani, setSonucekrani] = useState("");

  const mahkemeOptions = [
    { label: 'SULH HUKUK MAHKEMESİ', value: 'SULH HUKUK MAHKEMESİ' },
    { label: 'İCRA HUKUK VE İCRA CEZA MAHKEMESİ', value: 'İCRA HUKUK VE İCRA CEZA MAHKEMESİ' },
    { label: 'ASLİYE HUKUK MAHKEMESİ', value: 'ASLİYE HUKUK MAHKEMESİ' },
    { label: 'AİLE MAHKEMESİ', value: 'AİLE MAHKEMESİ' },
    { label: 'İŞ MAHKEMESİ', value: 'İŞ MAHKEMESİ' },
    { label: 'KADASTRO MAHKEMESİ', value: 'KADASTRO MAHKEMESİ' },
    { label: 'TÜKETİCİ MAHKEMESİ', value: 'TÜKETİCİ MAHKEMESİ' },
    { label: 'FİKRİ VE SINAİ HAKLAR H.MAHKEMESİ', value: 'FİKRİ VE SINAİ HAKLAR H.MAHKEMESİ' },
    { label: 'TİCARET MAHKEMESİ', value: 'TİCARET MAHKEMESİ' },
    { label: 'DENİZCİLİK İHTİSAS MAHKEMESİ', value: 'DENİZCİLİK İHTİSAS MAHKEMESİ' },
  ];

  const courtMapping: { [key: string]: number } = {
    "SULH HUKUK MAHKEMESİ": 1,
    "İCRA HUKUK VE İCRA CEZA MAHKEMESİ": 2,
    "ASLİYE HUKUK MAHKEMESİ": 3,
    "AİLE MAHKEMESİ": 4,
    "İŞ MAHKEMESİ": 5,
    "KADASTRO MAHKEMESİ": 6,
    "TÜKETİCİ MAHKEMESİ": 7,
    "FİKRİ VE SINAİ HAKLAR H.MAHKEMESİ": 8,
    "TİCARET MAHKEMESİ": 9,
    "DENİZCİLİK İHTİSAS MAHKEMESİ": 10,
  };

  const maktudeger = 615.40;

  const hesapla = () => {
    const davadegeri = parseFloat(deger) || 0;
    const tanikSayisi = parseInt(tanikcmb) || 0;
    const tarafSayisi = parseInt(tarafcmb) || 0;
    const bilirkisiSayisi = parseInt(bilirkisicmb) || 0;
    const avukatSayisi = parseInt(avukatcmb) || 0;
    const mahkemeValue = mahkeme ? courtMapping[mahkeme] : 0;

    const dosyagideri = 22.10;
    const bilirkisi1 = 1600;
    const bilirkisi2 = 2700;
    const bilirkisi3 = 2100;
    const bilirkisi4 = 3200;
    const tanikGideri = 187;
    const diger = 400;
    const sulh_icra = 281.8;
    const asliye_hukuk_idare = 615.40;
    const tuketici_mahk = 0;
    const vekaletharc = 87.5;
    const pesinharc = 1.70775;
    const tebligat = 435;

    let harchesap = davadegeri * pesinharc / 100;
    if (maktu && harchesap < 269.85) {
      harchesap = maktudeger;
    }

    let bilirkisiucreti = 0;
    let basvuru = 0;
    if (mahkemeValue === 1 || mahkemeValue === 2) {
      bilirkisiucreti = bilirkisiSayisi * bilirkisi1;
      basvuru = sulh_icra;
    } else if (mahkemeValue === 3) {
      bilirkisiucreti = bilirkisiSayisi * bilirkisi2;
      basvuru = asliye_hukuk_idare;
    } else if (mahkemeValue === 4 || mahkemeValue === 5 || mahkemeValue === 6) {
      bilirkisiucreti = bilirkisiSayisi * bilirkisi3;
      basvuru = asliye_hukuk_idare;
    } else if (mahkemeValue === 8 || mahkemeValue === 9 || mahkemeValue === 10) {
      bilirkisiucreti = bilirkisiSayisi * bilirkisi4;
      basvuru = asliye_hukuk_idare;
    }

    const tebligatucreti = tarafSayisi * tebligat;
    const tanikucreti = tanikSayisi * tanikGideri;
    const vekaletsuret = avukatSayisi * vekaletharc;

    const toplam = harchesap + dosyagideri + basvuru + bilirkisiucreti + tebligatucreti + tanikucreti + vekaletsuret + diger;

    setSonuc(toplam.toFixed(2) + " TL");
    setSonucekrani(
      "AYRINTILI HESAP DÖKÜMÜ\n---------------------------\n" +
      "Mahkeme Türü: " + (mahkeme || "Seçilmedi") + "\n" +
      "Dava Değeri: " + davadegeri + " TL\n---------------------------\n" +
      "Başvuru Harcı: " + basvuru + " TL\n" +
      "Dosya Gideri: " + dosyagideri + " TL\n" +
      "Peşin Harç: " + harchesap.toFixed(2) + " TL\n" +
      "Tebligat Gideri: " + tebligatucreti + " TL\n" +
      "Vekalet Suret Harcı: " + vekaletsuret + " TL\n" +
      "Bilirkişi Ücreti: " + bilirkisiucreti + " TL\n" +
      "Keşif Gideri: 0 TL\n" +
      "Tanık Gideri: " + tanikucreti + " TL\n" +
      "Diğer İş Ve İşlemler: " + diger + " TL\n---------------------------\n" +
      "Toplam: " + toplam.toFixed(2) + " TL"
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
        <View style={styles.card}>
          {/* Mahkeme Türü Alanı */}
          <View style={[styles.fieldContainer, { zIndex: 9999 }]}>
            <Text style={styles.label}>Mahkeme Türü:</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.pickerButtonText}>
                {mahkeme ? mahkeme : 'LİSTEDEN SEÇİNİZ...'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal */}
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
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
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Dava Değeri Alanı */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Dava Değeri (TL):</Text>
            <TextInput
              style={styles.input}
              value={deger}
              onChangeText={setDeger}
              keyboardType="numeric"
              placeholder="Değer giriniz"
            />
          </View>

          {/* Maktu Harç Alanı */}
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Maktu Harç:</Text>
            <Switch value={maktu} onValueChange={setMaktu} />
          </View>

          {/* Diğer Form Alanları */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Tanık Sayısı (0–10):</Text>
            <TextInput
              style={styles.input}
              value={tanikcmb}
              onChangeText={setTanikcmb}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Tanık sayısı belli değil ise:</Text>
            <Switch value={tanikchk} onValueChange={setTanikchk} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Taraf Sayısı (1–10):</Text>
            <TextInput
              style={styles.input}
              value={tarafcmb}
              onChangeText={setTarafcmb}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bilirkişi Sayısı (0–10):</Text>
            <TextInput
              style={styles.input}
              value={bilirkisicmb}
              onChangeText={setBilirkisicmb}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Avukat Sayısı (0–10):</Text>
            <TextInput
              style={styles.input}
              value={avukatcmb}
              onChangeText={setAvukatcmb}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Bilirkişi (varsa):</Text>
            <Switch value={bilirkisichk} onValueChange={setBilirkisichk} />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Keşif (varsa):</Text>
            <Switch value={kesifchk} onValueChange={setKesifchk} />
          </View>

          <TouchableOpacity style={styles.button} onPress={hesapla}>
            <Text style={styles.buttonText}>HESAPLA</Text>
          </TouchableOpacity>

          <Text style={styles.resultLabel}>Toplam Harç ve Gider Avansı:</Text>
          <Text style={styles.result}>{sonuc}</Text>

          <Text style={styles.detailsLabel}>Ayrıntılı Hesap Dökümü:</Text>
          <Text style={styles.details}>{sonucekrani}</Text>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#2A5C82',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
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
  result: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    maxHeight: '70%',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
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
});
