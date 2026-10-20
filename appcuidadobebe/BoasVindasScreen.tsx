import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Type';
import Ursinho from './Ursinho';
import { COR_FUNDO, COR_TEXTO, COR_ESCURA, COR_BOTAO } from './theme';
type Props = NativeStackScreenProps<RootStackParamList, 'BoasVindas'>;


export default function BoasVindasScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cuidar do seu bebê começa aqui</Text>
      <Text style={styles.subtitulo}>
        Fraldas, mamadeira, sono, peso e muito mais em um só lugar
      </Text>

      <View style={styles.botoes}>
        <Pressable
          style={styles.botao}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoBotao}>Entrar</Text>
        </Pressable>
        <Pressable
          style={styles.botao}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoBotao}>Criar conta</Text>
        </Pressable>
      </View>

      <Ursinho />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COR_FUNDO,
    paddingHorizontal: 28,
    paddingTop: 110,
  },
  titulo: {
    color: COR_TEXTO,
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 44,
    textTransform: 'uppercase',
  },
  subtitulo: {
    color: COR_TEXTO,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.8,
    marginTop: 14,
  },
  botoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  botao: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  textoBotao: {
    color: COR_BOTAO,
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});