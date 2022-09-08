import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const basicDimensions = {
  width: 360,
  height: 800,
};

const width = (basicwidth: number): number => {
  const percentage = (basicwidth / basicDimensions.width) * 100;

  return responsiveScreenWidth(percentage);
};

const height = (basicheight: number): number => {
  const percentage = (basicheight / basicDimensions.height) * 100;

  return responsiveScreenHeight(percentage);
};

const fontSize = (basicsize: number): number => {
  const percentage = basicsize * 0.135;

  return responsiveScreenFontSize(percentage);
};

const colors: ITheme = {
  mainColor: '#7DA2A9',
  mainOpacity5Color: 'rgba(0, 85, 0, 0.05)',
  mainOpacity10Color: 'rgba(0, 85, 0, 0.1)',
  bgColor: '#fafafa',
  mainLine: 'rgba(238, 238, 238, 0.9)',
  textColor: 'rgba(5, 7, 9, 0.9)',
  textSubColor: '#6e6f70',
  textOpacity10Color: 'rgba(5, 7, 9, 0.7)',
  white: '#fff',
  black: '#1e2022',
  disable: '#d6d6d6',
  error: '#b50000',
  point: '#d43900',
  blue: '#1F3A93',
  card: '#f4f4f4',
};

const Theme = {
  fontSize,
  colors,
  height,
  width,
};

export default Theme;
