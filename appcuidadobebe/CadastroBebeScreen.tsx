import { StyleSheet, Text, View } from 'react-native';

export default function CadastroBebeLogin () {
    return (
        <View style={styles.cantainer}>
            <Text styles={styles.titulo}>Cadastro do bebê.</Text>
            <Text styles={styles.texto}>
                qui vamos criar o formulário com o nome do bebê.
            </Text>
        </View>
    ); 
}
const styles=StyleSheet.create({
    cantainer:{
        flex: 1, 
        backgroundColor: '#ffffff', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 8, 
        padding: 24, 
    }, 

    titulo:{
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#2e5e44'
    },
    texto:{
        fontSize: 14, 
        color: '#666666', 
        textAlign: 'center',
    },
})