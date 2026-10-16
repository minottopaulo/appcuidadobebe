import { StyleSheet, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Type";
import RegistroBotao from "./RegistroBotao";


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function ScreenHome ( {route}: Props ){
    const {nomeBebe} = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <Text style={styles.nome}>{nomeBebe}</Text>
            </View>

            <View style={styles.grid}>
                <RegistroBotao rotulo="Troca de fralda" cor="#D9A441" />
                <RegistroBotao rotulo="Mamadeira" cor="#4A90D9" />
                <RegistroBotao rotulo="Peso" cor="#7B5FBF" />
                <RegistroBotao rotulo="Altura" cor="#5FA777" />
                <RegistroBotao rotulo="Banho" cor="#4AB8C4" />
                <RegistroBotao rotulo="Sono" cor="#C4677A" />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#3B7A57',
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    cabecalho: {
    alignItems: 'center',
    marginBottom: 24,
    },
nome: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    },
grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    },
});