import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';

import {SelectDateModal} from '~/components/atoms/Modal';
import {
  Layout,
  containerPadding,
  TextMedium,
  TextRegular,
} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import {DatePicker} from '~/components/atoms/DatePicker';
import Loading from '~/components/atoms/Loading';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';

import {isNetworkConnect} from '~/common/common';
import PlaceHolder from '~/assets/images/placeholder.svg';
import Config from 'react-native-config';

const TodoTab3 = () => {
  const webViewRef = useRef<WebView<{}>>(null);
  const [date, setDate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [responseSelectData, setResponseSelectData] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [isWebViewRoad, setIsWebViewRoad] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);

  const handlePressButton = () => {
    sendMessage(selectedData);
  };

  const sendMessage = (data: {
    imageUrl: string;
    location: [number[], number[]];
    isMobile: boolean;
    isFirst?: boolean;
  }) => {
    const sendData = JSON.stringify({
      type: 'SEND',
      data: {
        imageUrl: data.imageUrl,
        location: data.location,
        isMobile: data.isMobile,
        isFirst: data.isFirst,
      },
    });

    webViewRef.current?.postMessage(sendData);
  };

  useEffect(() => {
    setIsLoading(true);
    isNetworkConnect(setIsNetworkRefresh);
    getAllDate();
  }, [selectSeq, isFetch]);

  useEffect(() => {
    sendMessage(selectedData);
  }, [selectedData]);

  useEffect(() => {
    if (date && responseSelectData.length > 0) {
      setIsLoading(true);
      setDatePickerVisibility(false);

      getInfo(date);
    }
  }, [date, responseSelectData]);

  return (
    <Layout isBgWhite>
      {isNetworkRefresh === false ? (
        <NavigateNetworkCard
          isMainColor
          title={'데이터를 불러오지 못했습니다'}
          subTitle={'인터넷 연결 확인 후 다시 시도해주세요'}
          label={'다시 시도하기'}
          handleNavigate={() => {
            setIsFetch(true);
          }}
        />
      ) : isLoading ? (
        <Loading loadingText="정보를 불러오는 중입니다" />
      ) : (
        <>
          <ContentDatePicker>
            <DatePicker datePickerDate={date} isCalendar={false} />
            <ContentCalendar
              activeOpacity={0.6}
              onPress={() => setNdviDatePickerVisibility(true)}>
              <PlaceHolder
                width={Theme.fontSize(24)}
                height={Theme.fontSize(24)}
              />
              <ContentCalendarText>
                <CalendarText>날짜선택</CalendarText>
              </ContentCalendarText>
            </ContentCalendar>
          </ContentDatePicker>
          <WebView
            thirdPartyCookiesEnabled={false}
            cacheEnabled={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            originWhitelist={['*']}
            incognito={false}
            ref={webViewRef}
            source={{
              uri: Config.NDVI_URL,
            }}
            onLoadEnd={() => {
              setSelectedData({
                imageUrl: selectedData.imageUrl,
                location: selectedData.location,
                isMobile: true,
                isFirst: true,
              });
            }}
            onMessage={(event) => {
              const {data} = event.nativeEvent;
              const dataString = JSON.parse(data);
              setIsWebViewRoad(dataString.onLoaded);
            }}
          />

          <WebViewSection>
            <WebViewButtonSection
              activeOpacity={0.8}
              style={styles.shadow}
              onPress={() => {
                handlePressButton();
              }}>
              <PlaceHolder
                width={Theme.fontSize(17)}
                height={Theme.fontSize(17)}
              />
              <WebViewInfoText>돌아가기</WebViewInfoText>
            </WebViewButtonSection>
          </WebViewSection>

          {isDatePickerVisible && responseSelectData.length > 0 && (
            <SelectDateModal
              data={responseSelectData}
              setDate={setDate}
              isVisible={isDatePickerVisible}
              setIsVisible={() => setNdviDatePickerVisibility(false)}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default TodoTab3;

const WebViewSection = styled.View`
  position: absolute;
  left: 0;
  top: ${Theme.height(83)}px;
  right: 0;
  background-color: transparent;
  z-index: 1000;
  flex-direction: row;
  justify-content: space-between;
  ${containerPadding};
`;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 5,
  },
});

const ContentDatePicker = styled.View`
  background-color: ${Theme.colors.white};
  flex-direction: row;
  justify-content: space-between;
`;

const WebViewButtonSection = styled.TouchableOpacity`
  background-color: ${Theme.colors.white};
  flex-direction: row;
  padding: ${Theme.height(8)}px ${Theme.width(16)}px;
  align-items: center;
  border-radius: 30px;
`;

const WebViewInfoText = styled(TextMedium)`
  margin-left: ${Theme.width(8)}px;
`;

const ContentCalendar = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${Theme.height(8)}px ${Theme.width(16)}px;
`;

const ContentCalendarText = styled.View`
  margin-top: ${Theme.height(5)}px;
`;

const CalendarText = styled(TextRegular)`
  font-size: ${Theme.fontSize(12)}px;
  color: ${Theme.colors.mainColor};
  text-align: center;
`;
