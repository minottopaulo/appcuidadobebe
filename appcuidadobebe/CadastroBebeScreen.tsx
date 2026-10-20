import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './Type';
import Flutuante from './Flutuante';
import { COR_FUNDO, COR_TEXTO, COR_ESCURA, COR_DESTAQUE } from './theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroBebe'>;

export default function CadastroBebeScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');

  async function continuar() {
    const nomeLimpo = nome.trim();
    if (nomeLimpo === '') {
      return;
    }
    await AsyncStorage.setItem('nomeBebe', nomeLimpo);
    navigation.replace('Home', { nomeBebe: nomeLimpo });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Flutuante>
          <Image
            source={require('./assets/cadastrobebe.png')}
            style={styles.ilustracao}
            resizeMode="contain"
          />
        </Flutuante>

        <Text style={styles.titulo}>Cadastro do seu bebê</Text>
        <Text style={styles.subtitulo}>Como se chama seu pequeno?</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do bebê"
          placeholderTextColor="rgba(242, 232, 213, 0.6)"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <Pressable style={styles.botao} onPress={continuar}>
          <Text style={styles.textoBotao}>Continuar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COR_FUNDO,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 60,
    gap: 14,
  },
  ilustracao: {
    width: '100%',
    height: 280,
  },
  titulo: {
    color: COR_TEXTO,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subtitulo: {
    color: COR_TEXTO,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 14,
    fontSize: 15,
    color: COR_TEXTO,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: COR_DESTAQUE,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotao: {
    color: COR_ESCURA,
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});