import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
};

// device width/height
const deviceWidthDp = Dimensions.get('window').width;
// design width/height
const uiWidthPx = 750;

export function px2dp(uiElementPx) {
  const length = uiElementPx * deviceWidthDp / uiWidthPx;
  return Math.ceil(length);
}
