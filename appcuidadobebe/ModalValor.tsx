import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { COR_TEXTO, COR_ESCURA, COR_DESTAQUE } from './theme';

type Props = {
  visivel: boolean;
  titulo: string;
  unidade: string;
  onSalvar: (valor: number) => void;
  onCancelar: () => void;
};

export default function ModalValor({
  visivel,
  titulo,
  unidade,
  onSalvar,
  onCancelar,
}: Props) {
  const [texto, setTexto] = useState('');

  useEffect(() => {
    if (visivel) {
      setTexto('');
    }
  }, [visivel]);

  function salvar() {
    const numero = parseFloat(texto.replace(',', '.'));
    if (isNaN(numero) || numero <= 0) {
      return;
    }
    onSalvar(numero);
  }

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={onCancelar}
    >
      <KeyboardAvoidingView
        style={styles.fundo}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.caixa}>
          <Text style={styles.titulo}>{titulo}</Text>

          <View style={styles.linhaCampo}>
            <TextInput
              style={styles.input}
              value={texto}
              onChangeText={setTexto}
              keyboardType="decimal-pad"
              placeholder="0,0"
              placeholderTextColor="rgba(46, 94, 68, 0.4)"
              autoFocus
            />
            <Text style={styles.unidade}>{unidade}</Text>
          </View>

          <View style={styles.botoes}>
            <Pressable style={styles.botaoCancelar} onPress={onCancelar}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.botaoSalvar} onPress={salvar}>
              <Text style={styles.textoSalvar}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  caixa: {
    backgroundColor: COR_TEXTO,
    borderRadius: 28,
    padding: 24,
    gap: 16,
  },
  titulo: {
    color: COR_ESCURA,
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  linhaCampo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(46, 94, 68, 0.12)',
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 14,
    fontSize: 20,
    color: COR_ESCURA,
  },
  unidade: {
    color: COR_ESCURA,
    fontSize: 18,
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoCancelar: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COR_ESCURA,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textoCancelar: {
    color: COR_ESCURA,
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  botaoSalvar: {
    flex: 1,
    backgroundColor: COR_DESTAQUE,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  textoSalvar: {
    color: COR_ESCURA,
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});