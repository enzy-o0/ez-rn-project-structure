import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {userLogout} from '~/reducers/UsersSlice';

import PlaceHolder from '~/assets/images/placeholder.svg';

import {Line, Layout, TextRegular} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import {CommonModal} from '~/components/atoms/Modal';

import {
  RootStackNavigationProp,
  SettingTabStackParamList,
} from '~/features/navigations/@types';

interface IProps {
  page?: keyof SettingTabStackParamList;
  title: string;
  isDir: boolean;
  isVersion?: boolean;
  version?: string;
}

const SettingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ListItem = ({page, title, isDir, isVersion, version}: IProps) => {
    return (
      <ListItemRow
        onPress={() => {
          navigation.navigate(page);
        }}
        activeOpacity={0.6}>
        <ListItemWrapper isDir={isDir}>
          <PlaceHolder width={Theme.fontSize(24)} height={Theme.fontSize(24)} />
          <Title isDir={isDir}>{title}</Title>
        </ListItemWrapper>
        {isVersion && (
          <Title isLastVersion isDir={isDir}>
            {version}
          </Title>
        )}
      </ListItemRow>
    );
  };

  const handleLogout = async () => {
    await dispatch(userLogout());
  };

  return (
    <Layout isBgWhite>
      <ScrollView>
        <Main>
          <Section isDir={false}>
            <ListItem page="SettingInquiry" title="1:1 문의" isDir />
          </Section>
          <Divider />
          <Section isDir={false}>
            <ListItem page="SettingNotice" title="공지사항" isDir />
            <ListItem page="SettingNotification" title="알림설정" isDir />
          </Section>
          <Divider />
          <Section isDir={false}>
            <ListItem isVersion version={'최신 버전'} title="버전정보" isDir />
          </Section>
          <Divider />
          <Section
            onPress={() => {
              setIsModalVisible(true);
            }}
            isDir={false}>
            <LogoutText>로그아웃</LogoutText>
          </Section>
        </Main>
      </ScrollView>
      {isModalVisible && (
        <CommonModal
          isTwoBtn
          cancelLabel="취소"
          handleCancel={() => setIsModalVisible(false)}
          label="확인"
          modalTextLabel="로그아웃 하시겠어요?"
          handleConfirm={() => {
            setIsModalVisible(false);
            handleLogout();
          }}
        />
      )}
    </Layout>
  );
};

export default SettingScreen;

const Main = styled.View`
  padding-top: ${Theme.height(24)}px;
  flex: 1;
`;

const Divider = styled.View`
  ${Line}
`;

const Section = styled.TouchableOpacity<{isDir: boolean}>`
  flex-direction: ${({isDir}) => (isDir ? 'row' : 'column')};
  justify-content: ${({isDir}) => (isDir ? 'space-evenly' : 'flex-start')};
  padding: ${Theme.height(8)}px 0;
`;

const ListItemRow = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding-right: ${Theme.width(16)}px;
  padding-left: ${Theme.width(16)}px;
`;

const ListItemWrapper = styled.View<{isDir: boolean}>`
  display: flex;
  flex-direction: ${({isDir}) => (isDir ? 'row' : 'column')};
  align-items: center;
  padding: ${Theme.height(15)}px 0;
`;

const Title = styled(TextRegular)<{isDir: boolean; isLastVersion?: boolean}>`
  font-size: ${({isLastVersion}) =>
    isLastVersion ? Theme.fontSize(16) : Theme.fontSize(18)}px;
  color: ${({isLastVersion}) =>
    isLastVersion ? Theme.colors.mainColor : Theme.colors.black};
  margin-left: ${Theme.width(8)}px;
`;

const LogoutText = styled.Text`
  flex: 1;
  margin-left: ${Theme.width(8)}px;
  text-align: left;
`;
