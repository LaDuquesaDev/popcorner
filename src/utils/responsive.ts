import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const baseAncho = 375;
const baseAlto = 812;

export const pixelHorizontal = (size: number) => (width / baseAncho) * size;
export const pixelVertical = (size: number) => (height / baseAlto) * size;
export const pixelModerado = (size: number, factor = 0.5) =>
  size + (pixelHorizontal(size) - size) * factor;
