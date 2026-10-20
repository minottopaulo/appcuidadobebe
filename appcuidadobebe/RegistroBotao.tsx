import { useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  rotulo: string;
  cor: string;
  icone: ImageSourcePropType;
};

function formatarHora(data: Date) {
  return data.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RegistroBotao({ rotulo, cor, icone }: Props) {
  const [registros, setRegistros] = useState<Date[]>([]);
  const chave = `registros:${rotulo}`;

  useEffect(() => {
    async function carregar() {
      const salvo = await AsyncStorage.getItem(chave);
      if (salvo !== null) {
        const datas: string[] = JSON.parse(salvo);
        setRegistros(datas.map((texto) => new Date(texto)));
      }
    }
    carregar();
  }, []);

  async function registrar() {
    const novos = [new Date(), ...registros].slice(0, 3);
    setRegistros(novos);
    await AsyncStorage.setItem(chave, JSON.stringify(novos));
  }

  return (
    <Pressable
      style={[styles.card, { backgroundColor: cor }]}
      onPress={registrar}
    >
      <Image source={icone} style={styles.personagem} resizeMode="contain" />

      <View style={styles.textos}>
        <Text style={styles.rotulo}>{rotulo}</Text>
        <Text style={styles.horario}>
          {registros.length > 0 ? formatarHora(registros[0]) : '--:--'}
        </Text>
        {registros.length > 1 && (
          <Text style={styles.historico}>
            {registros.slice(1).map(formatarHora).join('  ·  ')}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 100,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingRight: 16,
    paddingLeft: 130,
  },
  personagem: {
    position: 'absolute',
    left: 8,
    bottom: 0,
    width: 116,
    height: 130,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  rotulo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  horario: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  historico: {
    color: '#ffffff',
    fontSize: 13,
    opacity: 0.75,
  },
});