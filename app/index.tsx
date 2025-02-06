import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
   setUsernameError('');
    setPasswordError('');
    setLoading(true);

    if (!username) {
      setUsernameError('Lütfen kullanıcı adınızı girin.');
      setLoading(false);
      return;
    }
    if (!password) {
      setPasswordError('Lütfen şifrenizi girin.');
      setLoading(false);
      return;
    }
    //  ŞİMDİLİK GEÇİCİ ÇÖZÜM (TEST İÇİN)
       if (username === 'admin' && password === '1234') {
         router.push('/home'); // Başarıyla giriş yaptıktan sonra yönlendirme
             setLoading(false);
       } else {
         Alert.alert('Hata', 'Geçersiz kullanıcı adı veya şifre.');
             setLoading(false);
       }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <View style={styles.innerContainer}>
          <Image source={require('@/assets/onlengul-logo.png')} style={styles.logo} />
          <Text style={styles.title}>ÖNLEN & GÜL HUKUK</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={24} color="#fff" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Kullanıcı Adı"
                placeholderTextColor="#fff" // Placeholder rengi beyaz
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCompleteType="username"
              />
            </View>
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="#fff" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor="#fff" // Placeholder rengi beyaz
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCompleteType="password"
              />
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#2A5C82" />
              ) : (
                <Text style={styles.buttonText}>Giriş Yap</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A5C82', // Arka plan lacivert
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
  },
  logo: {
    width: 270, // Logo genişliği arttırıldı
    height: 270, // Logo yüksekliği arttırıldı
    resizeMode: 'contain',
    marginBottom: 20, // Boşluk arttırıldı
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Başlık rengi beyaz
    marginBottom: 35,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff', // Input çerçeve rengi beyaz
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#fff' // Input metin rengi beyaz
  },
  button: {
    backgroundColor: '#fff', // Buton arka plan rengi beyaz
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#2A5C82', // Buton metin rengi lacivert
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#ffd700', // Hata mesajı rengi altın sarısı
    fontSize: 14,
    marginBottom: 5,
    marginLeft:10
  },
});