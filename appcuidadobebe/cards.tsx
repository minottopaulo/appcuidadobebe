import { ImageSourcePropType } from 'react-native'; 

export type TipoCard = 'horario' | 'valor'; 

export type Card = {
    id:string;
    rotulo:string;
    cor:string; 
    incone:ImageSourcePropType; 
    tipo:TipoCard; 
    unidade?:string; 
};

export const cards: Card[] = [
    {
        id: 'fralda', 
        rotulo: 'Troca de fralda', 
        cor: '#D9A441',
        incone: require('./assets/fralda.png'),
        tipo: 'horario',
    }, 
    {
        id: 'mamadeira', 
        rotulo: 'Mamadeira', 
        cor: '#4A90D9',
        incone: require('./assets/mamadeira.png'), 
        tipo: 'horario',
    },
    {
    id: 'peso',
    rotulo: 'Peso',
    cor: '#7B5FBF',
    incone: require('./assets/peso.png'),
    tipo: 'valor',
    unidade: 'kg',
  },
  {
    id: 'altura',
    rotulo: 'Altura',
    cor: '#a75f99',
    incone: require('./assets/altura.png'),
    tipo: 'valor',
    unidade: 'cm',
  },
  {
    id: 'banho',
    rotulo: 'Banho',
    cor: '#4AB8C4',
    incone: require('./assets/banho.png'),
    tipo: 'horario',
  },
  {
    id: 'sono',
    rotulo: 'Sono',
    cor: '#C4677A',
    incone: require('./assets/sono.png'),
    tipo: 'horario',
  },
];