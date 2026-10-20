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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const cards = [
  {
    rotulo: 'Troca de fralda',
    cor: '#D9A441',
    icone: require('./assets/fralda.png'),
  },
  {
    rotulo: 'Mamadeira',
    cor: '#4A90D9',
    icone: require('./assets/mamadeira.png'),
  },
  { rotulo: 'Peso', cor: '#7B5FBF', icone: require('./assets/peso.png') },
  { rotulo: 'Altura', cor: '#a75f99', icone: require('./assets/altura.png') },
  { rotulo: 'Banho', cor: '#4AB8C4', icone: require('./assets/banho.png') },
  { rotulo: 'Sono', cor: '#C4677A', icone: require('./assets/sono.png') },
];

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
            <RegistroBotao
              key={card.rotulo}
              rotulo={card.rotulo}
              cor={card.cor}
              icone={card.icone}
            />
          ))}
        </View>

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