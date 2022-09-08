import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '~/features/navigations/@types';
import {useRoute} from '@react-navigation/core';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {
  Layout,
  Section,
  CommonMain,
  TextMedium,
} from '~/components/styles/Mixin';
import {DatePicker} from '~/components/atoms/DatePicker';
import Theme from '~/components/styles/theme';
import LineGraph from '~/components/atoms/LineGraph';
import BarGraph from '~/components/atoms/BarGraph';
import dayjs from 'dayjs';
import {useDispatch} from 'react-redux';
import Loading from '~/components/atoms/Loading';
import {errorHandler, isNetworkConnect} from '~/common/common';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';

type PastWeatherProps = {
  graph: {label: {temp: {max: number; min: number}}; values: []};
  info: {
    data: string;
    max: string;
    min: string; 
    code: string;
    temp: string;
  };
};

const PastWeather = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {params} = useRoute();
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);

  const [date, setDate] = useState(
    params?.pastDate
      ? params?.pastDate
      : dayjs().subtract(1, 'day').format('YYYYMMDD'),
  );

  useEffect(() => {
    params?.pastDate && setDate(params?.pastDate);
  }, [params?.pastDate]);

  const [pastWeatherData, setPastWeatherData] = useState<PastWeatherProps>({});

  const getPastWeatherData = async () => {
    try {
      // const res = await weatherApi.getPastWeather(seq, date);
      // if (res.data.success) {
      //   const response = res.data.data;
      //   setPastWeatherData(response);
      // }
      setPastWeatherData({});
    } catch (e) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
      setIsFetch(false);
    }
  };

  const setInitData = () => {
    setIsLoading(true);
    isNetworkConnect(setIsNetworkRefresh);

    getPastWeatherData();
  };

  useEffect(() => {
    if (date) {
      setInitData();
    }
  }, [date]);

  useEffect(() => {
    if (isFetch) {
      setInitData();
    }
  }, [isFetch]);

  return (
    <Layout>
      {isNetworkRefresh === false ? (
        <NavigateNetworkCardWrapper
          isMainColor
          title={'데이터를 불러오지 못했습니다'}
          subTitle={'인터넷 연결 확인 후 다시 시도해주세요'}
          label={'다시 시도하기'}
          handleNavigate={() => setIsFetch(true)}
        />
      ) : isLoading ? (
        <Loading loadingText="날씨 정보를 가져오고 있습니다" />
      ) : (
        <ScrollView>
          <DatePicker
            isCalendar
            datePickerDate={date}
            setDate={setDate}
            maximumDate={dayjs().subtract(1, 'day').format('YYYY-MM-DD')}
          />
          <Main>
            <Section>
              <Title>온도</Title>
              <ContentGraph>
                <LineGraph
                  isToday={false}
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
              </ContentGraph>
            </Section>
            <Section>
              <Title>강수량</Title>
              <ContentGraph>
                <BarGraph
                  isToday={false}
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
              </ContentGraph>
            </Section>
          </Main>
        </ScrollView>
      )}
    </Layout>
  );
};

export default PastWeather;

const Main = styled(CommonMain)`
  padding-top: ${Theme.height(20)}px;
  padding-bottom: ${Theme.height(24)}px;
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

const NavigateNetworkCardWrapper = styled(NavigateNetworkCard)`
  background: ${Theme.colors.white};
`;
