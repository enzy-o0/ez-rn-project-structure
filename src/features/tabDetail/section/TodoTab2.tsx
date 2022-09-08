import React, {useEffect, useState} from 'react';

import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import dayjs from 'dayjs';

import {DatePicker} from '~/components/atoms/DatePicker';
import Theme from '~/components/styles/theme';
import {
  Layout,
  CommonMain,
  TextRegular,
  containerPadding,
} from '~/components/styles/Mixin';
import Loading from '~/components/atoms/Loading';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';
import {PickerModal} from '~/components/atoms/Modal/PickerModal';
import {isNetworkConnect} from '~/common/common';

const TodoTab2 = () => {
  const [selectedItem, setSelectedItem] = useState<number>();
  const [date, setDate] = useState<string | null>(dayjs().format('YYYYMMDD'));
  const [responseData, setResponseData] = useState(null);
  const [responseDepthData, setResponseDepthData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);
  const [responseDepthLabel, setResponseDepthLabel] = useState([]);
  const [isPickerModalVisible, setIsPickerModalVisible] = useState(false);

  useEffect(() => {
    if (responseData !== null) {
      if (responseData.result.water) {
        const depthData = responseData.result.water.state.filter(
          (e) => e.depth === selectedItem,
        );

        setResponseDepthData({...depthData[0]});
      }
    }
  }, [selectedItem, responseData]);

  const setInitData = () => {
    setIsLoading(true);
    isNetworkConnect(setIsNetworkRefresh);
  };

  useEffect(() => {
    if (isFetch) {
      setInitData();
    }
  }, [isFetch]);

  useEffect(() => {
    setInitData();
  }, [date]);

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
        responseData !== null &&
        Object.keys(responseData).length > 0 && (
          <ScrollView>
            <DatePicker
              isCalendar
              datePickerDate={date}
              setDate={setDate}
              maximumDate={dayjs().format('YYYY-MM-DD')}
            />
            <Main>
              <TodoStateGraphContent>
                <TodoStateGraphItemsLabel
                  isLabelfontSize
                  color="#b50000"
                  flexRatio={1}
                  textAlign="center">
                  높음
                </TodoStateGraphItemsLabel>
                <TodoStateGraphItemsLabel
                  isLabelfontSize
                  color="#d36907"
                  flexRatio={1}
                  textAlign="center">
                  조금 높음
                </TodoStateGraphItemsLabel>
                <TodoStateGraphItemsLabel
                  isLabelfontSize
                  textAlign="center"
                  color={Theme.colors.mainColor}
                  flexRatio={2}>
                  정상
                </TodoStateGraphItemsLabel>
                <TodoStateGraphItemsLabel
                  isLabelfontSize
                  color="#d36907"
                  flexRatio={1}
                  textAlign="center">
                  조금 낮음
                </TodoStateGraphItemsLabel>
                <TodoStateGraphItemsLabel
                  isLabelfontSize
                  textAlign="center"
                  color="#b50000"
                  flexRatio={1}>
                  낮음
                </TodoStateGraphItemsLabel>
              </TodoStateGraphContent>
              <TodoStateGraphPointContent>
                <TodoStateGraphContent>
                  <TodoStateGraphItems color="#b50000" flexRatio={1} />
                  <TodoStateGraphItems color="#d36907" flexRatio={1} />
                  <TodoStateGraphItems
                    color={Theme.colors.mainColor}
                    flexRatio={2}
                  />
                  <TodoStateGraphItems color="#d36907" flexRatio={1} />
                  <TodoStateGraphItems color="#b50000" flexRatio={1} />
                </TodoStateGraphContent>
                <TodoStateGraphPoint
                  left={graphLeftLocation(
                    responseDepthData.high,
                    responseDepthData.highL,
                    responseDepthData.lowL,
                    responseDepthData.low,
                    responseDepthData.data,
                  )}
                />
              </TodoStateGraphPointContent>
              <TodoStateGraphContent>
                <TodoStateGraphItemsLabel
                  textAlign="right"
                  color="#b50000"
                  flexRatio={1}>
                  {responseDepthData.high}
                </TodoStateGraphItemsLabel>
                <TodoStateGraphItemsLabel
                  textAlign="right"
                  color="#d36907"
                  flexRatio={1}>
                  {responseDepthData.highL}
                </TodoStateGraphItemsLabel>
                <TodoStateGraphItemsLabel
                  textAlign="left"
                  color={Theme.colors.mainColor}
                  flexRatio={2}
                />
                <TodoStateGraphItemsLabel
                  textAlign="left"
                  color="#d36907"
                  flexRatio={1}>
                  {responseDepthData.lowL}
                </TodoStateGraphItemsLabel>
                <TodoStateGraphItemsLabel
                  textAlign="left"
                  color="#b50000"
                  flexRatio={1}>
                  {responseDepthData.low}
                </TodoStateGraphItemsLabel>
              </TodoStateGraphContent>
            </Main>
          </ScrollView>
        )
      )}
      {isPickerModalVisible && (
        <PickerModal
          handlePressOverlay={() => setIsPickerModalVisible(false)}
          pickerItems={responseDepthLabel}
          onValueChange={(item) => {
            setSelectedItem(item);
          }}
          handleCancel={() => setIsPickerModalVisible(false)}
        />
      )}
    </Layout>
  );
};

export default TodoTab2;

const Main = styled(CommonMain)`
  ${containerPadding}
  margin-bottom: ${Theme.height(65)}px;
`;

const TodoStateGraphContent = styled.View`
  flex-direction: row;
  flex: 5;
`;

const TodoStateGraphItems = styled.View<{
  color: string;
  flexRatio: number;
}>`
  height: ${Theme.height(28)}px;
  flex: ${({flexRatio}) => flexRatio};
  background-color: ${({color}) => color};
`;

const TodoStateGraphItemsLabel = styled(TextRegular)<{
  color?: string;
  flexRatio?: number;
  textAlign?: string;
  isLabelfontSize?: boolean;
}>`
  height: 100%;
  flex: ${({flexRatio}) => flexRatio};
  color: ${({color}) => color};
  text-align: ${({textAlign}) => textAlign};
  font-size: ${({isLabelfontSize}) =>
    isLabelfontSize ? `${Theme.fontSize(12)}px` : `${Theme.fontSize(14)}px`};
  margin-top: ${({isLabelfontSize}) =>
    isLabelfontSize ? `${Theme.height(24)}px` : 0};
`;

const TodoStateGraphPointContent = styled.View`
  height: ${Theme.height(28)}px;
  position: relative;
  justify-content: center;
  flex: 5;
`;

const TodoStateGraphPoint = styled.View<{left: number}>`
  position: absolute;
  border-radius: ${Theme.width(4)}px;
  background-color: #fff;
  width: ${Theme.width(8)}px;
  height: ${Theme.width(8)}px;
  left: ${({left}) => (left ? `${left - Theme.width(1)}%` : 0)};
`;
