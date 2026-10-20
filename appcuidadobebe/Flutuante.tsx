import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

type Props = {
  children: ReactNode;
  distancia?: number;
  duracao?: number;
};

export default function Flutuante({
  children,
  distancia = 12,
  duracao = 1500,
}: Props) {
  const valor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(valor, {
          toValue: -distancia,
          duration: duracao,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(valor, {
          toValue: 0,
          duration: duracao,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY: valor }] }}>
      {children}
    </Animated.View>
  );
}