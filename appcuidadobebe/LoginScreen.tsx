  import { COR_FUNDO, COR_TEXTO, COR_ESCURA, COR_DESTAQUE } from './theme';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './Type';
import Ursinho from './Ursinho';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;


export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function entrar() {
    await AsyncStorage.setItem('logado', 'sim');
    const nome = await AsyncStorage.getItem('nomeBebe');
    if (nome) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { nomeBebe: nome } }],
      });
    } else {
      navigation.navigate('CadastroBebe');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formulario}>
          <Text style={styles.titulo}>Que bom te ver de novo</Text>
          <Text style={styles.subtitulo}>
            Entre para acompanhar o seu pequeno
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
            placeholder="exemplo@gmail.com"
            placeholderTextColor="rgba(242, 232, 213, 0.6)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="rgba(242, 232, 213, 0.6)"
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
            Não tem conta?{' '}
            <Text style={styles.criarContaLink}>Criar conta</Text>
          </Text>
        </View>
        <Ursinho />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COR_FUNDO,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 60,
    left: 28,
    zIndex: 2,
  },
  voltar: {
    color: COR_TEXTO,
    fontSize: 14,
    opacity: 0.85,
  },
  conteudo: {
    flexGrow: 1,
  },
  formulario: {
    paddingHorizontal: 28,
    paddingTop: 110,
    gap: 12,
  },
  titulo: {
    color: COR_TEXTO,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
    textTransform: 'uppercase',
  },
  subtitulo: {
    color: COR_TEXTO,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.8,
    marginBottom: 8,
  },
  botoesSociais: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoSocial: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COR_TEXTO,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textoBotaoSocial: {
    color: COR_TEXTO,
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divisor: {
    textAlign: 'center',
    color: COR_TEXTO,
    opacity: 0.7,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 14,
    fontSize: 15,
    color: COR_TEXTO,
  },
  esqueciSenha: {
    textAlign: 'right',
    color: COR_TEXTO,
    fontSize: 13,
  },
  botaoEntrar: {
    backgroundColor: COR_DESTAQUE,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotaoEntrar: {
    color: COR_ESCURA,
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  criarConta: {
    textAlign: 'center',
    color: COR_TEXTO,
    fontSize: 14,
    marginTop: 4,
  },
  criarContaLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});