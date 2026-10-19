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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Type';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroBebe'>;

export default function CadastroBebeScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
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
      ])
    ).start();
  }, []);

  function continuar() {
    if (nome.trim() === '') {
      return;
    }
    navigation.navigate('Home', { nomeBebe: nome.trim() });
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/cadastrobebe.png')}
        style={[styles.ilustracao, { transform: [{ translateY: flutuar }] }]}
        resizeMode="contain"
      />

      <Text style={styles.titulo}>Cadastro do seu bebê.</Text>
      <Text style={styles.subtitulo}>Como se chama seu pequeno?</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do seu bebê"
        placeholderTextColor="#ffffff"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      <Pressable style={styles.botao} onPress={continuar}>
        <Text style={styles.textoBotao}>Continuar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003d188e',
    paddingHorizontal: 24,
    paddingTop: 60,
    gap: 12,
  },
  ilustracao: {
    width: '100%',
    height: 300,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E5E44',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 115,
    paddingVertical: 15,
    fontSize: 15,
  },
  botao: { 
    backgroundColor: '#2E5E44',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',

  },
});