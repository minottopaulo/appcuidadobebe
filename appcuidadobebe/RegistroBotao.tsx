import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

type Props = {
  rotulo: string;
  cor: string;
};

function formatarHora(data: Date){
  return data.toLocaleTimeString('pt-BR', {
    hour: '2-digit', 
    minute: '2-digit',
  });
}

export default function RegistroBotao({ rotulo, cor }: Props) {
  const [registro, setRegistro] = useState<Date[]>([]);
  const chave = `registros:${rotulo}`;

  useEffect(()=>{
    async function carregar() {
      const salvo = await AsyncStorage.getItem(chave);
      if (salvo !== null) {
        const datas: string[] = JSON.parse(salvo);
        setRegistro(datas.map((texto) => new Date(texto)));
      }
    }
    carregar();
  }, []);
  async function registrar() {
    const novos = [new Date(), ...registro].slice(0, 3);
    setRegistro(novos);
    await AsyncStorage.setItem(chave, JSON.stringify(novos));
  }

  return (
    <Pressable
      style={[styles.card, { backgroundColor: cor }]}
      onPress={registrar}
    >
      <Text style={styles.rotulo}>{rotulo}</Text>

      <Text style={styles.horario}>
        {registro.length > 0 ? formatarHora(registro[0]) : '--:--'}
      </Text>

      {registro.slice(1).map((data, index) => (
        <Text key={index} style={styles.historico}>
          {formatarHora(data)}
        </Text>
      ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  rotulo: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  horario: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  historico: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.7,
  },
});