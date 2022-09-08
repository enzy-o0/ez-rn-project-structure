import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '~/features/navigations/@types';
import {ScrollView, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import Config from 'react-native-config';

import {
  Layout,
  CommonMain,
  Section,
  TextRegular,
  TextMedium,
} from '~/components/styles/Mixin';
import {DatePicker} from '~/components/atoms/DatePicker';
import Theme from '~/components/styles/theme';
import LineGraph from '~/components/atoms/LineGraph';
import BarGraph from '~/components/atoms/BarGraph';
import Placeholder from '~/assets/images/placeholder.svg';
import {SvgUri} from 'react-native-svg';
import Loading from '~/components/atoms/Loading';
import {useDispatch} from 'react-redux';
import {errorHandler, isNetworkConnect} from '~/common/common';
import {useNavigation} from '@react-navigation/core';
import dayjs from 'dayjs';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';

type TodayWeatherProps = {
  graph: {label: {temp: {max: number; min: number}}; values: []};
  info: {
    data: string;
    max: string;
    min: string;
    code: string;
    temp: string;
  };
};

const TodayWeather = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [date, setDate] = useState(dayjs().format('YYYYMMDD'));
  const [todayWeatherData, setTodayWeatherData] = useState<TodayWeatherProps>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);
  const getTodayWeatherData = async () => {
    try {
      // const res = await weatherApi.getTodayWeather(seq);
      // if (res.data.success) {
      //   setIsLoading(false);
      //   const response = res.data.data;
      //   setTodayWeatherData(response);
      // }
      setTodayWeatherData({});
    } catch (e) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
    }
  };

  const setInitData = () => {
    setIsLoading(true);
    isNetworkConnect(setIsNetworkRefresh);

    getTodayWeatherData();
  };

  useEffect(() => {
    setInitData();
  }, []);

  useEffect(() => {
    if (isFetch) {
      setInitData();
    }
  }, [isFetch]);

  const onRefresh = React.useCallback(() => {
    setIsFetch(true);

    setTimeout(() => {
      setIsFetch(false);
    }, 1000);
  }, []);

  return (
    <Layout isBgWhite={isNetworkRefresh === false}>
      {isNetworkRefresh === false ? (
        <NavigateNetworkCard
          isMainColor
          title={'데이터를 불러오지 못했습니다'}
          subTitle={'인터넷 연결 확인 후 다시 시도해주세요'}
          label={'다시 시도하기'}
          handleNavigate={() => setIsFetch(true)}
        />
      ) : isLoading ? (
        <Loading loadingText="날씨 정보를 가져오고 있습니다" />
      ) : (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isFetch} onRefresh={onRefresh} />
            }>
            <DatePicker datePickerDate={date} setDate={setDate} />
            <Main>
              <Section>
                <ContentCurrent>
                  <CurrentIcon>
                    {todayWeatherData.info ? (
                      <SvgUri
                        width={Theme.width(84)}
                        height={Theme.width(84)}
                        uri={`${Config.IMAGE_URL}/weather/sunny.svg`}
                      />
                    ) : (
                      <Placeholder
                        width={Theme.width(84)}
                        height={Theme.width(84)}
                      />
                    )}
                  </CurrentIcon>
                  <CurrentCol>
                    <CurrentTextRow isMarginLeft>
                      <CurrentTempText>
                        {todayWeatherData.info
                          ? todayWeatherData.info?.temp
                          : '-'}
                      </CurrentTempText>
                    </CurrentTextRow>
                    <CurrentTextRow isMarginLeft={false}>
                      <MinMaxTextCol>
                        <Placeholder
                          width={Theme.width(24)}
                          height={Theme.width(24)}
                        />
                        <TempText isMin={false}>
                          {todayWeatherData.info
                            ? todayWeatherData.info?.max
                            : '-'}
                        </TempText>
                      </MinMaxTextCol>
                      <MinMaxTextCol>
                        <Placeholder
                          width={Theme.width(24)}
                          height={Theme.width(24)}
                        />
                        <TempText isMin>
                          {todayWeatherData.info
                            ? todayWeatherData.info?.min
                            : '-'}
                        </TempText>
                      </MinMaxTextCol>
                    </CurrentTextRow>
                  </CurrentCol>
                </ContentCurrent>
                <ContentDivider isAbsolute={false}>
                  <Divider isAbsolute={false} isMarginLeft />
                  <Divider isAbsolute={false} isMarginLeft={false} />
                </ContentDivider>
                <ContentCurrentTotal>
                  <ContentDivider isAbsolute>
                    <Divider isAbsolute isMarginLeft />
                    <Divider isAbsolute isMarginLeft={false} />
                  </ContentDivider>
                  <CurrentSkyText>
                    -
                  </CurrentSkyText>
                </ContentCurrentTotal>
              </Section>
              <Section>
                <Title>온도</Title>
                <ContentGraph>
                  {todayWeatherData.graph && (
                    <LineGraph
                      isToday={true}
                      values={[
                        {
                          data: 0,
                          temp: 27,
                          time: '10시',
                        },
                        {
                          data: 0,
                          temp: 28,
                          time: '11시',
                        },
                        {
                          data: 0,
                          temp: 30,
                          time: '12시',
                        },
                      ]}
                      label={{temp: {max: 30, min: 22}}}
                    />
                  )}
                </ContentGraph>
              </Section>
              <Section>
                <Title>강수량 변화</Title>
                <ContentGraph>
                  {todayWeatherData.graph && (
                    <BarGraph
                      isToday={true}
                      values={[
                        {
                          data: 0,
                          temp: 27,
                          time: '10시',
                        },
                        {
                          data: 0,
                          temp: 28,
                          time: '11시',
                        },
                        {
                          data: 0,
                          temp: 30,
                          time: '12시',
                        },
                      ]}
                    />
                  )}
                </ContentGraph>
              </Section>
            </Main>
          </ScrollView>
        </>
      )}
    </Layout>
  );
};

export default TodayWeather;

const Main = styled(CommonMain)`
  padding-top: ${Theme.height(20)}px;
  padding-bottom: ${Theme.height(24)}px;
`;

const ContentCurrent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: ${Theme.colors.white};
  border-radius: ${Theme.fontSize(4)}px;
  padding-top: ${Theme.height(10)}px;
  padding-bottom: ${Theme.height(10)}px;
`;

const CurrentIcon = styled.View`
  width: 50%;
  align-items: flex-end;
`;

const ContentDivider = styled.View<{isAbsolute: boolean}>`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  position: ${({isAbsolute}) => (isAbsolute ? 'absolute' : 'relative')};
`;

const Divider = styled.View<{
  isAbsolute: boolean;
  isMarginLeft: boolean;
}>`
  width: ${Theme.width(8)}px;
  height: ${Theme.height(8)}px;
  background-color: ${({isAbsolute}) =>
    isAbsolute ? '#f6f6f6' : Theme.colors.white};
  border-radius: ${({isAbsolute}) =>
    isAbsolute ? `${Theme.fontSize(4)}px` : 0};
  margin: ${({isMarginLeft}) =>
    isMarginLeft ? `0 0 0 ${Theme.width(15)}px` : `0 ${Theme.width(15)}px 0 0`};
`;

const ContentCurrentTotal = styled.View`
  width: 100%;
  position: relative;
  background-color: ${Theme.colors.white};
  border-radius: ${Theme.fontSize(4)}px;
  padding: ${Theme.height(14)}px 0 ${Theme.height(20)}px;
`;

const CurrentTextRow = styled.View<{
  isMarginLeft: boolean;
}>`
  margin-left: ${({isMarginLeft}) =>
    isMarginLeft ? `${Theme.width(35)}px;` : 0};
  flex-direction: row;
`;

const CurrentTempText = styled(TextMedium)`
  font-size: ${Theme.fontSize(32)}px;
  text-align: center;
  line-height: ${Theme.fontSize(48)}px;
`;

const TempText = styled(TextRegular)<{isMin: boolean}>`
  font-size: ${Theme.fontSize(18)}px;
  color: ${({isMin}) => (isMin ? Theme.colors.blue : Theme.colors.point)};
  line-height: ${Theme.fontSize(27)}px;
`;

const MinMaxTextCol = styled.View`
  flex-direction: row;
  margin-right: ${Theme.width(8)}px;
`;

const CurrentCol = styled.View`
  width: 50%;
  margin-left: ${Theme.width(18)}px;
`;

const CurrentSkyText = styled(TextMedium)`
  line-height: ${Theme.fontSize(23)}px;
  text-align: center;
  color: ${Theme.colors.mainColor};
  margin: 0 ${Theme.width(18)}px;
`;

const Title = styled(TextMedium)`
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize(18)}px;
  line-height: ${Theme.fontSize(27)}px;
`;

const ContentGraph = styled.View`
  margin-top: ${Theme.height(8)}px;
  margin-bottom: ${Theme.height(16)}px;
`;
