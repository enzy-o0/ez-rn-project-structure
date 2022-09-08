import styled, {css} from 'styled-components/native';
import Theme from './theme';

export const Layout = styled.SafeAreaView<{isBgWhite?: boolean}>`
  background-color: ${({isBgWhite}) => isBgWhite && '#ffffff'};
  flex: 1;
`;

export const CommonMain = styled.View`
  padding-right: ${Theme.width(16)}px;
  padding-left: ${Theme.width(16)}px;
`;

export const Section = styled.View`
  margin-bottom: ${Theme.height(16)}px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${Theme.colors.line};
`;

export const LoadingCenter = styled.View`
  width: ${Theme.width(360)}px;
  height: ${Theme.height(800)}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${Theme.colors.bg};
`;

export const TextRegular = styled.Text`
  font-family: 'NotoSansKR-Regular';
  font-size: ${Theme.fontSize(14)}px;
  color: ${Theme.colors.black};
  line-height: ${Theme.fontSize(20)}px;
`;

export const TextMedium = styled.Text`
  font-family: 'NotoSansKR-Medium';
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.black};
  line-height: ${Theme.fontSize(23)}px;
  font-weight: 500;
`;

export const TextBold = styled.Text`
  font-family: 'NotoSansKR-Bold';
  font-size: ${Theme.fontSize(20)}px;
  line-height: ${Theme.fontSize(29)}px;
  color: ${Theme.colors.mainColor};
`;

export const NoDataWrapper = styled.View`
  padding: ${Theme.width(30)}px;
  border-radius: ${Theme.fontSize(4)}px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Theme.colors.line};
  margin: ${Theme.height(30)}px ${Theme.width(16)}px;
`;

export const NoDataTitle = styled(TextMedium)`
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.subText};
`;

export const contentPadding1216 = css`
  padding: ${Theme.height(12)}px ${Theme.width(16)}px;
`;

export const containerPadding = css`
  padding-right: ${Theme.width(16)}px;
  padding-left: ${Theme.width(16)}px;
`;

export const container = css`
  flex: 1;
  padding-right: ${Theme.width(16)}px;
  padding-left: ${Theme.width(16)}px;
  background-color: #fff;
`;

export const FlexRowSpaceBetweenView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const GoToButtonWrapper = styled.TouchableOpacity`
  margin: 0 ${Theme.width(20)}px;
  padding: 0;
`;

export const flexCenter = css`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Line = css`
  width: 100%;
  height: 1px;
  background-color: ${Theme.colors.line};
`;

export const ToastView = styled.View`
  width: ${Theme.width(328)}px;
  padding: ${Theme.height(10)}px ${Theme.width(16)}px;
  border-radius: ${Theme.fontSize(4)}px;
  background-color: ${Theme.colors.black};
`;

export const ToastContent = styled(TextMedium)`
  color: ${Theme.colors.white};
  text-align: center;
`;

export const pickerStyle = {
  inputIOS: {
    color: '#000',
    fontSize: Theme.fontSize(13),
    paddingRight: Theme.width(16),
    paddingLeft: Theme.width(16),
  },
  inputAndroid: {
    color: '#000',
    height: Theme.fontSize(48),
    fontSize: Theme.fontSize(16),
    paddingRight: Theme.width(16),
    paddingLeft: Theme.width(16),
  },
  placeholderColor: 'white',
  underline: {borderTopWidth: 0},
};

export const IconWrapper = styled.TouchableOpacity`
  padding-right: ${Theme.width(8)}px;
  z-index: -999;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
