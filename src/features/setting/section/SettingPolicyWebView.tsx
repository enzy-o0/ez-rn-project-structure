import React, {useEffect, useState} from 'react';
import {isNetworkConnect} from '~/common/common';
import WebView from 'react-native-webview';
import Config from 'react-native-config';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';

const SettingPolicyWebView = ({navigation: {setParams}}) => {
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (isFetch) {
      isNetworkConnect(setIsNetworkRefresh);
    }
  }, [isFetch]);

  return (
    <>
      {isNetworkRefresh === false ? (
        <NavigateNetworkCard
          isMainColor
          title={'데이터를 불러오지 못했습니다'}
          subTitle={'인터넷 연결 확인 후 다시 시도해주세요'}
          label={'다시 시도하기'}
          handleNavigate={() => setIsFetch(true)}
        />
      ) : (
        <WebView source={{uri: `${Config.TERM_URL}/service`}} />
      )}
    </>
  );
};

export default SettingPolicyWebView;
