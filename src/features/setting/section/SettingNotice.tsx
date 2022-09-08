import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Layout, NoDataWrapper, NoDataTitle} from '~/components/styles/Mixin';
import Accordion from '~/components/atoms/Accordion';
import Theme from '~/components/styles/theme';
import {errorHandler, isNetworkConnect} from '~/common/common';
import {useDispatch} from 'react-redux';
import Loading from '~/components/atoms/Loading';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';
import {useRoute} from '@react-navigation/core';

const SettingNotice = ({navigation}) => {
  const {params} = useRoute();
  const dispatch = useDispatch();
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);

  useEffect(() => {
    const parent = navigation.getParent();

    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, [navigation]);

  const getNoticesData = async () => {
    try {
      // const res = await settingApi.getNotice();

      // if (res.data.success) {
      //   const response = res.data.data;
      setNotices([
        {
          create_date: '2022-02-03',
          title: '공지사항',
          content: '공지사항입니다',
        },
      ]);
      // }
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

    getNoticesData();
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
        <Loading loadingText="공지사항을 가져오고 있습니다" />
      ) : (
        <Main>
          {notices.length > 0 ? (
            <Accordion
              data={notices}
              isFetch={isFetch}
              setIsFetch={setIsFetch}
              dataAPI={getNoticesData}
              isInquiry={false}
              seq={params?.seq}
            />
          ) : (
            <NoDataWrapper>
              <NoDataTitle>공지사항이 없습니다</NoDataTitle>
            </NoDataWrapper>
          )}
        </Main>
      )}
    </Layout>
  );
};

export default SettingNotice;

const Main = styled.View`
  padding-top: ${Theme.height(20)}px;
`;
