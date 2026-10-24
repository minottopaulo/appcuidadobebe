import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './Type';
import RegistroBotao from './RegistroBotao';
import Flutuante from './Flutuante';
import { cards } from './cards';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function ScreenHome({ route, navigation }: Props) {
  const { nomeBebe } = route.params;

  async function sair() {
    await AsyncStorage.removeItem('logado');
    navigation.reset({
      index: 0,
      routes: [{ name: 'BoasVindas' }],
    });
  }

  return (
    <ImageBackground
      source={require('./assets/fundo.png')}
      style={styles.tela}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.areaNuvem}>
          <Flutuante distancia={6} duracao={2300}>
            <ImageBackground
              source={require('./assets/nuvem.png')}
              style={styles.nuvem}
              resizeMode="contain"
            >
              <Text style={styles.nome}>{nomeBebe}</Text>
            </ImageBackground>
          </Flutuante>
        </View>

        <View style={styles.lista}>
          {cards.map((card) => (
            <RegistroBotao key={card.id} card={card} />
          ))}
        </View>

        <Text style={styles.dica}>
          Segure um card para apagar o último registro
        </Text>

        <Pressable onPress={sair} style={styles.botaoSair}>
          <Flutuante distancia={4} duracao={2800}>
            <ImageBackground
              source={require('./assets/nuvem.png')}
              style={styles.nuvemSair}
              resizeMode="contain"
            >
              <Text style={styles.sair}>Sair</Text>
            </ImageBackground>
          </Flutuante>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#3B7A57',
  },
  conteudo: {
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  areaNuvem: {
    alignItems: 'center',
    marginBottom: 40,
  },
  nuvem: {
    width: 260,
    aspectRatio: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nome: {
    color: '#2E5E44',
    fontSize: 28,
    fontWeight: 'bold',
  },
  lista: {
    gap: 36,
  },
  dica: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 28,
  },
  botaoSair: {
    marginTop: 32,
    alignSelf: 'center',
  },
  nuvemSair: {
    width: 110,
    aspectRatio: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sair: {
    color: '#2E5E44',
    fontSize: 14,
    fontWeight: 'bold',
  },
});