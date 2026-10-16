import { useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

type Props = {
  rotulo: string;
  cor: string;
};

export default function RegistroBotao({ rotulo, cor }: Props) {
  const [ultimoRegistro, setUltimoRegistro] = useState<Date | null>(null);

  function registrar() {
    setUltimoRegistro(new Date());
  }

  return (
    <Pressable style={styles.card} onPress={registrar}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <Text style={styles.horario}>
        {ultimoRegistro ? ultimoRegistro.toLocaleTimeString() : '--:--'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#0c2234d1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  rotulo: {
    color: '#5e8dc381',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  horario: {
    color: '#ffffff',
    fontSize: 20,
  },
});