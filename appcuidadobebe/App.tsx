import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistroBotao from './RegistroBotao';
import LoginScrean from './LoginScreen';

export default function(){
  return(
    <>
    <LoginScrean />
    <StatusBar style="auto"/>
    </>
  )
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
});