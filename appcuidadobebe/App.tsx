import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import CadastroBebeScreen from './CadastroBebeScreen';
import ScreenHome from './ScreenHome';
import { RootStackParamList } from './Type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [nomeBebe, setNomeBebe] = useState<string | null>(null);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    async function carregar() {
      const salvo = await AsyncStorage.getItem('nomeBebe');
      const sessao = await AsyncStorage.getItem('logado');
      setNomeBebe(salvo);
      setLogado(sessao !== null);
      setCarregando(false);
    }
    carregar();
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E5E44" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={logado && nomeBebe ? 'Home' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CadastroBebe" component={CadastroBebeScreen} />
        <Stack.Screen
          name="Home"
          component={ScreenHome}
          initialParams={{ nomeBebe: nomeBebe ?? '' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}