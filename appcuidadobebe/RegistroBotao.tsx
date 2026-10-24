import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from './cards';
import ModalValor from './ModalValor';

type Props = {
  card: Card;
};

type Registro = {
  data: string;
  valor?: number;
};

function formatarHora(data: Date) {
  return data.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatarNumero(numero: number) {
  return numero.toString().replace('.', ',');
}

export default function RegistroBotao({ card }: Props) {
  const { id, rotulo, cor, incone, tipo, unidade } = card;
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const chave = `registros:${id}`;

  useEffect(() => {
    async function carregar() {
      const salvo = await AsyncStorage.getItem(chave);
      if (salvo !== null) {
        const lista: (string | Registro)[] = JSON.parse(salvo);
        setRegistros(
          lista.map((item) => (typeof item === 'string' ? { data: item } : item)),
        );
      }
    }
    carregar();
  }, []);

  async function guardar(novo: Registro) {
    const novos = [novo, ...registros].slice(0, 3);
    setRegistros(novos);
    await AsyncStorage.setItem(chave, JSON.stringify(novos));
  }

  function aoTocar() {
    if (tipo === 'valor') {
      setModalAberto(true);
    } else {
      guardar({ data: new Date().toISOString() });
    }
  }

  async function aoSalvarValor(valor: number) {
    setModalAberto(false);
    await guardar({ data: new Date().toISOString(), valor });
  }

  function textoDoRegistro(registro: Registro) {
    if (tipo === 'valor' && registro.valor !== undefined) {
      return `${formatarNumero(registro.valor)} ${unidade ?? ''}`.trim();
    }
    return formatarHora(new Date(registro.data));
  }

  const vazio = tipo === 'valor' ? `-- ${unidade ?? ''}`.trim() : '--:--';

  return (
    <>
      <Pressable
        style={[styles.card, { backgroundColor: cor }]}
        onPress={aoTocar}
      >
        <Image source={incone} style={styles.personagem} resizeMode="contain" />

        <View style={styles.textos}>
          <Text style={styles.rotulo}>{rotulo}</Text>
          <Text style={styles.horario}>
            {registros.length > 0 ? textoDoRegistro(registros[0]) : vazio}
          </Text>
          {registros.length > 1 && (
            <Text style={styles.historico}>
              {registros.slice(1).map(textoDoRegistro).join('  ·  ')}
            </Text>
          )}
        </View>
      </Pressable>

      {tipo === 'valor' && (
        <ModalValor
          visivel={modalAberto}
          titulo={rotulo}
          unidade={unidade ?? ''}
          onSalvar={aoSalvarValor}
          onCancelar={() => setModalAberto(false)}
        />
      )}
    </>
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