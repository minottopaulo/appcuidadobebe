import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, useWindowDimensions } from 'react-native';

export default function Ursinho() {
  const { width } = useWindowDimensions();
  const altura = width * (975 / 1170);
  const subida = useRef(new Animated.Value(altura)).current;

  useEffect(() => {
    Animated.spring(subida, {
      toValue: 0,
      friction: 7,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.Image
      source={require('./assets/boasvindas.png')}
      style={[
        styles.ursinho,
        { width, height: altura, transform: [{ translateY: subida }] },
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  ursinho: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});