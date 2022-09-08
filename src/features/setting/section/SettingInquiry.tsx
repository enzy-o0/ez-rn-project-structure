import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components/native';
import {Layout} from '~/components/styles/Mixin';
import Accordion from '~/components/atoms/Accordion';
import Theme from '~/components/styles/theme';
import NavigateCard from '~/components/atoms/Card/NavigateCard';
import Loading from '~/components/atoms/Loading';
import {useSelector, useDispatch} from 'react-redux';
import {setInquiryIsRefreshedClear} from '~/reducers/RefreshSlice';
import {errorHandler, isNetworkConnect} from '~/common/common';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';
import {useRoute} from '@react-navigation/core';

const SettingInquiry = ({navigation}) => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const [isInquiryData, setIsInquiryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);
  const {isInquiryRefresh} = useSelector((state) => state.refresh);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: Theme.fontSize(60),
          paddingTop: Theme.fontSize(5),
          paddingBottom: Theme.fontSize(5),
        },
        tabBarVisible: undefined,
      });
  }, [navigation]);

  const getPersonalInquiryData = async () => {
    try {
      // const res = await settingApi.getPersonalInquiry(seq);

      // if (res.data.success) {
      // const response = res.data.data;
      setIsInquiryData([
        {
          create_date: '22/02/23',
          title: '문의하기',
          content: '문의하기입니다',
          category: '카테고리',
          answer: {
            create_date: '22/02/23',
            content: '답변입니다',
          },
        },
      ]);
      // }
    } catch (e) {
      errorHandler(e.code, e.message, dispatch, navigation);
    } finally {
      setIsLoading(false);
      setIsFetch(false);
      dispatch(setInquiryIsRefreshedClear());
    }
  };

  const setInitData = useCallback(() => {
    setIsLoading(true);
    isNetworkConnect(setIsNetworkRefresh);

    getPersonalInquiryData();
  }, []);

  useEffect(() => {
    setInitData();
  }, []);

  useEffect(() => {
    if (isInquiryRefresh || isFetch) {
      setInitData();
    }
  }, [isFetch, isInquiryRefresh]);

  return (
    <Layout isBgWhite>
      {isNetworkRefresh === false ? (
        <NavigateNetworkCard
          isMainColor
          title={'데이터를 불러오지 못했습니다'}
          subTitle={'인터넷 연결 확인 후 다시 시도해주세요'}
          label={'다시 시도하기'}
          handleNavigate={() => setIsFetch(true)}
        />
      ) : isLoading ? (
        <Loading loadingText="문의 내역을 가져오고 있습니다" />
      ) : (
        <Main isInquiryData={isInquiryData.length === 0}>
          {isInquiryData.length !== 0 ? (
            <Accordion
              data={isInquiryData}
              isInquiry
              isFetch={isFetch}
              setIsFetch={setIsFetch}
              dataAPI={getPersonalInquiryData}
            />
          ) : (
            <NavigateCard
              isMainColor={false}
              subTitle={false}
              isExperience={false}
              title={'1:1 문의하기 입니다'}
              label="1:1 문의 등록하기"
              handleNavigate={() => {
                if (params) {
                  navigation.navigate(`${params?.screen}AddInquiry`);
                }
              }}
            />
          )}
        </Main>
      )}
    </Layout>
  );
};

const Main = styled.View<{isInquiryData: boolean}>`
  margin-top: ${({isInquiryData}) =>
    isInquiryData ? `${Theme.height(48)}px` : `${Theme.height(20)}px`};

  padding-right: ${({isInquiryData}) =>
    !isInquiryData ? '0px' : `${Theme.width(16)}px`};

  padding-left: ${({isInquiryData}) =>
    !isInquiryData ? '0px' : `${Theme.width(16)}px`};
`;

export default SettingInquiry;
