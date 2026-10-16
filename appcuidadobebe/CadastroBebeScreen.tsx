import { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Type';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroBebe'>;

export default function CadastroBebeScreen ({navigation}: Props) {
    const [nome, setNome] = useState('');
    function continuar(){
        if (nome.trim()===''){
            return;
        }
        navigation.navigate('Home', { nomeBebe: nome.trim() });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastro do seu bebê.</Text>
            <Text style={styles.subtitulo}>Como se chama seu pequeno?</Text>

            <TextInput
            style={styles.input}
            placeholder="Nome do bebê"
            placeholderTextColor="#999"
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
const styles=StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 120,
    gap: 12,
    },
titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E5E44',
    textAlign: 'center',
    },
subtitulo: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 12,
    },
input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
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
