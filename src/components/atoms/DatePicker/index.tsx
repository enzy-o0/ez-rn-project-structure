import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import dayjs from 'dayjs';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import {TextRegular, TextMedium} from '~/components/styles/Mixin';
import PlaceHolder from '~/assets/images/placeholder.svg';
import Theme from '~/components/styles/theme';

interface Iprops {
  isCalendar?: boolean;
  datePickerDate?: any;
  setDate?: any;
  isPadding?: boolean;
  maximumDate?: any;
  minimumDate?: any;
}

export const DatePicker = ({
  maximumDate,
  minimumDate,
  isCalendar,
  datePickerDate,
  setDate,
  isPadding = true,
  ...props
}: Iprops) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [today, setToday] = useState(dayjs(datePickerDate));
  const [unitMinimumDate, setUnitMinimumDate] = useState({
    minYear: '1900',
    minMonth: '0',
    minDay: '1',
  });
  const {minYear, minMonth, minDay} = unitMinimumDate;

  const [unitMaximumDate, setUnitMaximumDate] = useState({
    maxYear: '2022',
    maxMonth: '0',
    maxDay: '1',
  });
  const {maxYear, maxMonth, maxDay} = unitMaximumDate;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined,
  ) => {
    hideDatePicker();

    if (event.type === 'set') {
      setToday(dayjs(date));
      setDate(dayjs(date).format('YYYYMMDD'));
    }
  };

  useEffect(() => {
    setToday(dayjs(datePickerDate));
  }, [datePickerDate]);

  useEffect(() => {
    if (minimumDate) {
      const dateFormat = minimumDate.split('-');
      setUnitMinimumDate({
        ...unitMinimumDate,
        minYear: dateFormat[0],
        minMonth: dateFormat[1],
        minDay: dateFormat[2],
      });
    }
  }, [minimumDate]);

  useEffect(() => {
    if (maximumDate) {
      const dateFormat = maximumDate.split('-');
      setUnitMaximumDate({
        ...unitMaximumDate,
        maxYear: dateFormat[0],
        maxMonth: dateFormat[1],
        maxDay: dateFormat[2],
      });
    }
  }, [maximumDate]);

  return (
    <DatePickerMain isPadding={isPadding} {...props}>
      <View>
        <ContentDate>
          <DateText>{today.format('YY년 M월 D일 dddd')}</DateText>
        </ContentDate>
        {isDatePickerVisible && (
          <RNDateTimePicker
            value={today.toDate()}
            mode={'date'}
            is24Hour={true}
            onChange={handleChange}
            maximumDate={
              maximumDate
                ? new Date(
                    Number(maxYear),
                    Number(maxMonth) - 1,
                    Number(maxDay),
                  )
                : dayjs().subtract(1, 'day').toDate()
            }
            minimumDate={
              minimumDate
                ? new Date(
                    Number(minYear),
                    Number(minMonth) - 1,
                    Number(minDay),
                  )
                : new Date(1900, 0, 1)
            }
          />
        )}
      </View>
      <View>
        {isCalendar && (
          <ContentCalendar activeOpacity={0.6} onPress={showDatePicker}>
            <PlaceHolder
              width={Theme.fontSize(24)}
              height={Theme.fontSize(24)}
            />
            <ContentCalendarText>
              <CalendarText>날짜선택</CalendarText>
            </ContentCalendarText>
          </ContentCalendar>
        )}
      </View>
    </DatePickerMain>
  );
};

const DatePickerMain = styled.View<{isPadding: boolean}>`
  padding: ${({isPadding}) =>
    isPadding
      ? `${Theme.height(8)}px ${Theme.width(16)}px`
      : `${Theme.height(8)}px ${Theme.width(0)}px`};
  background-color: ${Theme.colors.white};
  flex-direction: row;
  justify-content: space-between;
`;

const ContentDate = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateText = styled(TextMedium)`
  font-size: ${Theme.fontSize(18)}px;
  color: ${Theme.colors.black};
  line-height: ${Theme.fontSize(27)}px;
`;

const ContentCalendar = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentCalendarText = styled.View`
  margin-top: ${Theme.height(5)}px;
`;

const CalendarText = styled(TextRegular)`
  font-size: ${Theme.fontSize(12)}px;
  color: ${Theme.colors.mainColor};
  text-align: center;
`;
