import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '~/features/navigations/@types';
import {ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import Config from 'react-native-config';

import {
  Layout,
  Section,
  CommonMain,
  TextMedium,
} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import {IconCard} from '~/components/atoms/Card';
import {DatePicker} from '~/components/atoms/DatePicker';
import dayjs from 'dayjs';
import {SvgUri} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {errorHandler, isNetworkConnect} from '~/common/common';
import {useNavigation} from '@react-navigation/core';

import Placeholder from '~/assets/images/placeholder.svg';

import Loading from '~/components/atoms/Loading';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';

type ForecastWeatherProps = {
  graph: {label: {temp: {max: number; min: number}}; values: []};
  info: {
    data: string;
    max: string;
    min: string;
    code: string;
    temp: string;
  };
};

const WeeklyWeather = ({values}) => {
  const renderWeek = values.map((day) => {
    return (
      <WeeklyMain key={day.date}>
        <WeeklyDate>{day.date}</WeeklyDate>
        <WeeklyDay>{day.day}</WeeklyDay>
        <WeeklyIcon>
          <SvgUri
            width={Theme.width(24)}
            height={Theme.width(24)}
            uri={`${Config.IMAGE_URL}/weather/${day.code}.svg`}
          />
        </WeeklyIcon>
        <WeeklyProgressWrapper>
          <WeeklyProgress />
          <WeeklyValue width={day.data.replace('%', '')} />
        </WeeklyProgressWrapper>
        <WeeklyProgressValue>
          <WeeklyText>{day.data}</WeeklyText>
        </WeeklyProgressValue>
      </WeeklyMain>
    );
  });

  return <View>{renderWeek}</View>;
};

const ForecastWeather = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [date, setDate] = useState(dayjs().add(1, 'day').format('YYYYMMDD'));
  const [forecastWeatherData, setForecastWeatherData] =
    useState<ForecastWeatherProps>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);

  const getForecastWeatherData = async () => {
    try {
      setForecastWeatherData({});
    } catch (e: any) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
      setIsFetch(false);
    }
  };

  const setInitData = () => {
    setIsLoading(true);
    isNetworkConnect(setIsNetworkRefresh);

    getForecastWeatherData();
  };

  useEffect(() => {
    setInitData();
  }, []);

  useEffect(() => {
    if (isFetch) {
      setInitData();
    }
  }, [isFetch]);

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
        <Loading loadingText="날씨 정보 가져오고 있습니다" />
      ) : (
        <>
          <ScrollView>
            <DatePicker datePickerDate={date} setDate={setDate} />
            <Main>
              <Section>
                <TomorrowRow>
                  <Title>내일 날씨</Title>
                </TomorrowRow>
                <ContentRow>
                  <IconCard
                    isMargin
                    icon={
                      <SvgUri
                        width={Theme.width(64)}
                        height={Theme.width(64)}
                        uri={`${Config.IMAGE_URL}/weather/sunny.svg`}
                      />
                    }
                  />
                </ContentRow>
                <ContentTomorrowTotal>
                  <TomorrowSkyText>
                    -
                  </TomorrowSkyText>
                </ContentTomorrowTotal>
              </Section>
            </Main>
          </ScrollView>
        </>
      )}
    </Layout>
  );
};

export default ForecastWeather;

const Main = styled(CommonMain)`
  padding-top: ${Theme.height(20)}px;
  padding-bottom: ${Theme.height(24)}px;
`;

const Title = styled(TextMedium)`
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize(18)}px;
  line-height: ${Theme.fontSize(27)}px;
`;

const TomorrowRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Theme.height(8)}px;
`;

const ContentRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ContentTomorrowTotal = styled.View`
  background-color: ${Theme.colors.white};
  padding: ${Theme.height(20)}px ${Theme.width(16)}px;
  border-radius: ${Theme.fontSize(4)}px;
`;

const TomorrowSkyText = styled(TextMedium)`
  text-align: center;
  color: ${Theme.colors.black};
`;

interface Iprops {
  width: number;
}

const WeeklyMain = styled.View`
  background-color: ${Theme.colors.white};
  padding: ${Theme.height(8)}px 0;
  border-radius: ${Theme.fontSize(4)}px;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Theme.height(8)}px;
`;

const WeeklyText = styled(TextMedium)`
  color: ${Theme.colors.black};
  font-size: ${Theme.fontSize(16)}px;
`;

const WeeklyDate = styled(WeeklyText)`
  margin-left: ${Theme.width(9)}px;
  width: ${Theme.width(35)}px;
`;

const WeeklyDay = styled(WeeklyText)`
  margin-left: ${Theme.width(9)}px;
`;

const WeeklyIcon = styled.View`
  margin-left: ${Theme.width(8)}px;
`;

const WeeklyProgressWrapper = styled.View`
  width: ${Theme.width(156)}px;
  height: ${Theme.height(16)}px;
  border-radius: ${Theme.fontSize(16)}px;
  position: relative;
  margin-left: ${Theme.width(8)}px;
`;

const WeeklyProgress = styled.View`
  width: 100%;
  height: ${Theme.height(16)}px;
  border-radius: ${Theme.fontSize(16)}px;
  background-color: rgba(127, 190, 248, 0.24);
  position: absolute;
`;

const WeeklyProgressValue = styled.View`
  margin-left: ${Theme.height(17)}px;
`;

const WeeklyValue = styled.View<Iprops>`
  width: ${(props) => props.width}%;
  height: ${Theme.height(16)}px;
  border-radius: ${Theme.fontSize(16)}px;
  background-color: rgba(127, 190, 248, 0.64);
  position: absolute;
`;
