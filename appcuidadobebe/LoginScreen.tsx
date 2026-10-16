import { useState } from 'react'
import { StyleSheet, Text, TextInput, Pressable, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function LoginScrean(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation(); 

    function entrar(){
        navigation.navigate('CadastroBebe' as never); 
    }
    return (
        <View style={styles.container}>
            <Image
            source={require('./assets/login.png')}
            style={styles.ilustracao}
            resizeMode="contain"
            />
            <Text style={styles.titulo}> Faça seu login com </Text>
            <Text style={styles.subtitulo}> Acompanhe os cuidados do seu bebê em um só lugar </Text>

        <View style={styles.botoesSociais}>
            <Pressable style={styles.botaoSocial}>
                <Text style={styles.textoBotaoSocial}> Google </Text>
            </Pressable>
            <Pressable style={styles.botaoSocial}>
                <Text style={styles.textoBotaoSocial}> Apple </Text>
            </Pressable>
        </View>
        <Text style={styles.divisor}>ou</Text>

        <TextInput 
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="passorword"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
        />
        <Pressable>
            <Text style={styles.esqueciSenha}>Esqueci minha senha?</Text>
        </Pressable>
        
        <Pressable style={styles.botaoEntrar} onPress={entrar}>
            <Text style={styles.textoBotaoEntrar}>Entrar</Text>
        </Pressable>
        
        <Text style={styles.criarConta}>
            Não tem conta? 
        <Text style={styles.criarContaLink}>
            Criar conta
        </Text>
        </Text>
        </View>
    );
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 80,
    gap: 12,
    },
titulo: {
    fontSize: 30,
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
botoesSociais: {
    flexDirection: 'row',
    gap: 12,
    },
botaoSocial: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    },
textoBotaoSocial: {
    fontSize: 14,
    color: '#333333',
    },
divisor: {
    textAlign: 'center',
    color: '#999999',
    marginVertical: 4,
    },
input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    },
esqueciSenha: {
    textAlign: 'right',
    color: '#2E5E44',
    fontSize: 13,
    },
botaoEntrar: {
    backgroundColor: '#2E5E44',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    },
textoBotaoEntrar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    },
criarConta: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    marginTop: 8,
},
    criarContaLink: {
    color: '#2E5E44',
    fontWeight: 'bold',
    },
ilustracao: {
    width: '100%',
    height: 220,
    },
});