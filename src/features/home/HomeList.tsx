import React from 'react';
import styled from 'styled-components/native';
import Theme from '~/components/styles/theme';
import {DatePicker} from '~/components/atoms/DatePicker';
import {TextMedium} from '~/components/styles/Mixin';
import {Card} from '~/components/atoms/Card';

const HomeList = ({navigation, listData, setIsFetch, isFetch}) => {
  const renderItem = ({item}) => {
    return (
      <NavigateCards
        key={item.seq}
        handlePress={() => {
          navigation.navigate('HomeTodo');
        }}
        todoList={['책 읽기', '산책하기']}
      />
    );
  };

  return (
    <>
      {listData && (
        <FlatListWrapper
          ListHeaderComponent={
            <>
              <DatePickerSection isPadding />
              <Title>오늘 할일</Title>
            </>
          }
          ListFooterComponent={<Title />}
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.seq}
          onRefresh={() => setIsFetch(true)}
          refreshing={isFetch}
        />
      )}
    </>
  );
};

export default HomeList;

const NavigateCards = styled(Card)`
  margin-bottom: ${Theme.height(16)}px;
  padding-right: ${Theme.width(16)}px;
  padding-left: ${Theme.width(16)}px;
`;

const DatePickerSection = styled(DatePicker)`
  padding-bottom: ${Theme.height(20)}px;
`;

const Title = styled(TextMedium)`
  color: ${Theme.colors.mainColor};
  font-size: ${Theme.fontSize(18)}px;
  line-height: ${Theme.fontSize(26)}px;
  margin-bottom: ${Theme.height(12)}px;
  padding-right: ${Theme.width(16)}px;
  padding-left: ${Theme.width(16)}px;
`;

const FlatListWrapper = styled.FlatList``;
