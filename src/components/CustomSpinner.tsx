import { Animated, StyleSheet, View } from 'react-native';
import { pixelHorizontal, pixelModerado } from '../utils/responsive';
import { COLORS } from '../constants/colors';

export const CustomSpinner = () => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    })
  ).start();

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <View style={styles.spinnerCircle} />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  spinnerCircle: {
    width: pixelHorizontal(40),
    height: pixelHorizontal(40),
    borderWidth: pixelModerado(4),
    borderColor: COLORS.buttonActive,
    borderTopColor: COLORS.transparent,
    borderRadius: pixelHorizontal(20),
  },
});
