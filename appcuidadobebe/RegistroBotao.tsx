import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from './cards';
import ModalValor from './ModalValor';
import { Alert, Image, StyleSheet, Text, Pressable, View } from 'react-native';

type Props = {
  card: Card;
};

type Registro = {
  data: string;
  valor?: number;
  fim?: string;
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

function formatarDuracao(inicio: string, fim: string) {
  const diferenca = new Date(fim).getTime() - new Date(inicio).getTime();
  const minutos = Math.max(Math.round(diferenca / 60000), 0);
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return horas > 0 ? `${horas}h ${resto}min` : `${resto}min`;
}

export default function RegistroBotao({ card }: Props) {
  const { id, rotulo, cor, icone, tipo, unidade, textoAndamento } = card;
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

  async function salvarLista(lista: Registro[]) {
    setRegistros(lista);
    await AsyncStorage.setItem(chave, JSON.stringify(lista));
  }

  async function guardar(novo: Registro) {
    await salvarLista([novo, ...registros].slice(0, 3));
  }

  async function alternarPeriodo() {
    const atual = registros[0];
    if (atual && atual.fim === undefined) {
      const fechado = { ...atual, fim: new Date().toISOString() };
      await salvarLista([fechado, ...registros.slice(1)]);
    } else {
      await guardar({ data: new Date().toISOString() });
    }
  }

  function aoTocar() {
    if (tipo === 'valor') {
      setModalAberto(true);
    } else if (tipo === 'periodo') {
      alternarPeriodo();
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
    if (tipo === 'periodo') {
      return registro.fim
        ? formatarDuracao(registro.data, registro.fim)
        : (textoAndamento ?? 'Em andamento');
    }
    return formatarHora(new Date(registro.data));
  }

  function detalheDoPeriodo(registro: Registro) {
    const inicio = formatarHora(new Date(registro.data));
    if (registro.fim) {
      return `${inicio} → ${formatarHora(new Date(registro.fim))}`;
    }
    return `desde ${inicio}`;
  }
  function pedirParaApagar() {
  if (registros.length === 0) {
    return;
  }
  Alert.alert(
    'Apagar último registro?',
    `${rotulo}: ${textoDoRegistro(registros[0])}`,
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: () => salvarLista(registros.slice(1)),
      },
    ],
  );
}

  let vazio = '--:--';
  if (tipo === 'valor') {
    vazio = `-- ${unidade ?? ''}`.trim();
  } else if (tipo === 'periodo') {
    vazio = '--';
  }

  return (
    <>
      <Pressable
      style={[styles.card, { backgroundColor: cor }]}
      onPress={aoTocar}
      onLongPress={pedirParaApagar}
    >
      <Image source={icone} style={styles.personagem} resizeMode="contain" />

        <View style={styles.textos}>
          <Text style={styles.rotulo}>{rotulo}</Text>
          <Text style={styles.horario}>
            {registros.length > 0 ? textoDoRegistro(registros[0]) : vazio}
          </Text>
          {tipo === 'periodo' && registros.length > 0 && (
            <Text style={styles.detalhe}>{detalheDoPeriodo(registros[0])}</Text>
          )}
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
  detalhe: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  historico: {
    color: '#ffffff',
    fontSize: 13,
    opacity: 0.75,
  },
});