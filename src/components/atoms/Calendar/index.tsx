import React, {useRef, useState, useEffect, useCallback} from 'react';
import styled from 'styled-components/native';
import {FlatList, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';

import Theme from '~/components/styles/theme';
import {TextMedium} from '~/components/styles/Mixin';

interface Iprops {
  date: any;
  setDate?: React.Dispatch<React.SetStateAction<string>>;
}

export const Calendar = ({date, setDate}: Iprops) => {
  const scrollViewRef = useRef<FlatList>(null);
  const TWOWEEK = 14;
  const [isClickDay, setIsClickDay] = useState(TWOWEEK - 1);
  const [isScrollEnd, setIsScollEnd] = useState(true);
  const [serviceStartDate, setServiceStartDate] = useState();

  useEffect(() => {
    const diff = TWOWEEK - dayjs().add(1, 'day').diff(dayjs(date), 'd');

    date
      ? diff > 0
        ? setIsClickDay(diff)
        : setIsClickDay(-1)
      : setIsClickDay(TWOWEEK - 1);
  }, [date]);

  useEffect(() => {
    const scrollIdx =
      isClickDay < 0
        ? 0
        : isClickDay > TWOWEEK - 1
        ? TWOWEEK - 1
        : isClickDay - 1;
    scrollViewRef.current?.scrollToIndex({
      index: scrollIdx,
      animated: true,
      viewPosition: 0.5,
    });
  }, [isClickDay]);

  useEffect(() => {
    const today = dayjs(date);
    setServiceStartDate(
      dayjs(
        new Date(
          Number(today.year),
          Number(today.month) - 1,
          Number(today.day),
        ),
      ),
    );
  }, []);

  const scrollViewRenderItem = useCallback(
    ({_, index}) => {
      const day = dayjs()
        .add(2, 'day')
        .subtract(TWOWEEK - index, 'day');
      const isToday = index === TWOWEEK - 2;
      const serviceDiff = day.diff(serviceStartDate);

      return (
        <ScrollDayContent
          activeOpacity={serviceDiff < 0 ? 1 : 0.6}
          onPress={() => {
            if (serviceDiff < 0) {
              return false;
            }

            setIsClickDay(index + 1);
            setDate(day.format('YYYYMMDD'));
          }}>
          <ScrollDayContentDayText isToday={isToday}>
            {isToday
              ? '오늘'
              : index === TWOWEEK - 1
              ? '내일'
              : day.format('dd')}
          </ScrollDayContentDayText>
          <ScrollDayContentDate isClickDay={isClickDay === index + 1}>
            <ScrollDayContentDateText
              isDisable={serviceDiff < 0 && true}
              isToday={isToday}
              isClickDay={isClickDay === index + 1}>
              {day.format('D')}
            </ScrollDayContentDateText>
          </ScrollDayContentDate>
        </ScrollDayContent>
      );
    },
    [isClickDay, serviceStartDate],
  );

  return (
    <Main>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (!isScrollEnd || isClickDay !== TWOWEEK - 1) {
            setDate(dayjs().format('YYYYMMDD'));
          }

          setIsScollEnd(true);
          setIsClickDay(TWOWEEK - 1);
        }}>
        <GoToTodayText isScrollEnd={isScrollEnd && isClickDay === TWOWEEK - 1}>
          오늘로 이동
        </GoToTodayText>
      </TouchableOpacity>
      <ScrollDay
        ref={scrollViewRef}
        horizontal
        data={Array(TWOWEEK).fill(0)}
        disableVirtualization={false}
        renderItem={scrollViewRenderItem}
        keyExtractor={(item, index) => String(index)}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            scrollViewRef.current?.scrollToIndex({
              index: isClickDay - 1,
              animated: true,
            });
          });
        }}
      />
    </Main>
  );
};

const Main = styled.View`
  margin-top: ${Theme.height(8)}px;
`;

const GoToTodayText = styled(TextMedium)<{isScrollEnd: boolean}>`
  color: ${({isScrollEnd}) =>
    isScrollEnd ? Theme.colors.disable : Theme.colors.black};
  margin-left: ${Theme.width(16)}px;
`;

const ScrollDay = styled.FlatList`
  margin-top: ${Theme.height(8)}px;
  padding: ${Theme.width(8)}px 0;
  flex-direction: row;
  background-color: ${Theme.colors.mainOpacity5Color};
`;

const ScrollDayContent = styled.TouchableOpacity`
  margin: 0 ${Theme.width(24)}px;
  align-items: center;
`;

const ScrollDayContentDayText = styled(TextMedium)<{isToday: boolean}>`
  font-size: ${Theme.fontSize(14)}px;
  line-height: ${Theme.fontSize(20)}px;
  color: ${({isToday}) => (isToday ? Theme.colors.mainColor : Theme.colors.subText)};
`;

const ScrollDayContentDateText = styled(TextMedium)<{
  isToday: boolean;
  isClickDay: boolean;
  isDisable: boolean;
}>`
  border-radius: ${Theme.fontSize(50)}px;
  color: ${({isToday, isClickDay, isDisable}) =>
    isClickDay || (isToday && isClickDay)
      ? Theme.colors.white
      : isToday
      ? Theme.colors.mainColor
      : isDisable
      ? Theme.colors.disable
      : Theme.colors.black};
`;

const ScrollDayContentDate = styled.View<{
  isClickDay: boolean;
}>`
  background-color: ${({isClickDay}) =>
    isClickDay ? Theme.colors.main : 'transparent'};
  border-radius: ${Theme.fontSize(50)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${Theme.width(30)}px;
  height: ${Theme.width(30)}px;
  margin-top: ${Theme.height(4)}px;
`;
