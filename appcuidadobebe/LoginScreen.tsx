import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();
  const flutuar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flutuar, {
          toValue: -12,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(flutuar, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  function entrar() {
    navigation.navigate('CadastroBebe' as never);
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/login.png')}
        style={[styles.ilustracao, { transform: [{ translateY: flutuar }] }]}
        resizeMode="contain"
      />

      <Text style={styles.titulo}>Faça seu login com</Text>
      <Text style={styles.subtitulo}>
        Acompanhe os cuidados do seu bebê em um só lugar
      </Text>

      <View style={styles.botoesSociais}>
        <Pressable style={styles.botaoSocial}>
          <Text style={styles.textoBotaoSocial}>Google</Text>
        </Pressable>
        <Pressable style={styles.botaoSocial}>
          <Text style={styles.textoBotaoSocial}>Apple</Text>
        </Pressable>
      </View>

      <Text style={styles.divisor}>ou</Text>

      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="#ffffff"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ffffff"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Pressable>
        <Text style={styles.esqueciSenha}>Esqueci minha senha?</Text>
      </Pressable>

      <Pressable style={styles.botaoEntrar} onPress={entrar}>
        <Text style={styles.textoBotaoEntrar}>Entrar</Text>
      </Pressable>

      <Text style={styles.criarConta}>
        Não tem conta? <Text style={styles.criarContaLink}>Criar conta</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003d188e',
    paddingHorizontal: 24,
    paddingTop: 80,
    gap: 12,
  },
  ilustracao: {
    width: '100%',
    height: 220,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E5E44',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#fcfcfc',
    textAlign: 'center',
    marginBottom: 12,
  },
  botoesSociais: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoSocial: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textoBotaoSocial: {
    fontSize: 14,
    color: '#ffffff',
  },
  divisor: {
    textAlign: 'center',
    color: '#ffffff',
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  esqueciSenha: {
    textAlign: 'right',
    color: '#ffffff',
    fontSize: 13,
  },
  botaoEntrar: {
    backgroundColor: '#2E5E44',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotaoEntrar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  criarConta: {
    textAlign: 'center',
    color: '#2E5E44',
    fontSize: 14,
    marginTop: 8,
  },
  criarContaLink: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
