import React from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';
import styled from 'styled-components/native';
import {Layout, CommonMain, TextMedium} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '~/features/navigations/@types';
import {OpenSourceLicense} from './OpenSourceLicense';

type NavigationProp = StackNavigationProp<RootStackParamList, 'TermOpenSource'>;

interface OpenSourceProps {
  libraryName: string;
}

const TermOpenSource = () => {
  const renderItem: ListRenderItem<OpenSourceProps> = ({item}) => {
    return (
      <>
        <ListWrapper>
          <ListTitle>{item.libraryName}</ListTitle>
          <Text>{item.version}</Text>
          <Text>{item._license}</Text>
          <Text>{item._description}</Text>
          <Text>{item._licenseContent}</Text>
        </ListWrapper>
        <Divider />
      </>
    );
  };

  return (
    <>
      <Layout isBgWhite>
        <CommonMain>
          <FlatList
            data={OpenSourceLicense}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.libraryName)}
          />
        </CommonMain>
      </Layout>
    </>
  );
};

export default TermOpenSource;

const ListWrapper = styled.View`
  padding-top: ${Theme.height(7)}px;
  padding-bottom: ${Theme.height(11)}px;
`;

const ListTitle = styled(TextMedium)`
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.black};
`;

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${Theme.colors.line};
`;
