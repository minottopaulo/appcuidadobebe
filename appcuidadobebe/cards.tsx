import { ImageSourcePropType } from 'react-native';

export type TipoCard = 'horario' | 'valor' | 'periodo';

export type Card = {
  id: string;
  rotulo: string;
  cor: string;
  icone: ImageSourcePropType;
  tipo: TipoCard;
  unidade?: string;
  textoAndamento?: string;
};

export const cards: Card[] = [
  {
    id: 'fralda',
    rotulo: 'Troca de fralda',
    cor: '#D9A441',
    icone: require('./assets/fralda.png'),
    tipo: 'horario',
  },
  {
    id: 'mamadeira',
    rotulo: 'Mamadeira',
    cor: '#4A90D9',
    icone: require('./assets/mamadeira.png'),
    tipo: 'horario',
  },
  {
    id: 'peso',
    rotulo: 'Peso',
    cor: '#7B5FBF',
    icone: require('./assets/peso.png'),
    tipo: 'valor',
    unidade: 'kg',
  },
  {
    id: 'altura',
    rotulo: 'Altura',
    cor: '#a75f99',
    icone: require('./assets/altura.png'),
    tipo: 'valor',
    unidade: 'cm',
  },
  {
    id: 'banho',
    rotulo: 'Banho',
    cor: '#4AB8C4',
    icone: require('./assets/banho.png'),
    tipo: 'horario',
  },
  {
    id: 'sono',
    rotulo: 'Sono',
    cor: '#C4677A',
    icone: require('./assets/sono.png'),
    tipo: 'periodo',
    textoAndamento: 'Dormindo',
  },
];