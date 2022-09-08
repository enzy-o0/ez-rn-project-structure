import React, {useState, useEffect, useRef, useCallback} from 'react';

import {FlatList, ViewToken} from 'react-native';
import styled from 'styled-components/native';
import dayjs from 'dayjs';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';

import {containerPadding, Layout, TextRegular} from '~/components/styles/Mixin';
import NavigateCard from '~/components/atoms/Card/NavigateCard';

import {DatePicker} from '~/components/atoms/DatePicker';
import Theme from '~/components/styles/theme';
import {isNetworkConnect, TextMedium} from '~/common/common';
import Loading from '~/components/atoms/Loading';
import {NavigateNetworkCard} from '~/components/atoms/Card/NavigateCard';
// import {instance} from '~/api';

type TabMenuType = {
  key: number;
  title: string;
  info?: string;
  dataKey: string;
};

export interface IProps {
  item: TabMenuType;
  index?: number;
}

const TabListsJson: TabMenuType[] = [
  {
    key: 0,
    dataKey: 'test1',
    title: 'test1',
    info: 'test1',
  },
  {
    key: 1,
    dataKey: 'test2',
    title: 'test2',
  },
  {
    key: 2,
    dataKey: 'test3',
    title: 'test3',
    info: 'test3',
  },
  {
    key: 3,
    dataKey: 'test4',
    title: 'test4',
  },
  {
    key: 4,
    dataKey: 'test5',
    title: 'test5',
    info: 'test5',
  },
  {
    key: 5,
    dataKey: 'test6',
    title: 'test6',
    info: 'test6',
  },
  {
    key: 6,
    dataKey: 'test7',
    title: 'test7',
    info: 'test7',
  },
  {
    key: 7,
    dataKey: 'test8',
    title: 'test8',
    info: 'test8',
  },
  {
    key: 8,
    dataKey: 'test9',
    title: 'test9',
    info: `test9`,
  },
];

const TodoTab1 = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<FlatList>(null);
  const sectionViewRef = useRef<FlatList>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<string | null>(dayjs().format('YYYYMMDD'));
  const [horizontalSelected, setHorizontalSelected] = useState<number>(0);
  const [verticalSelected, setVerticalSelected] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>('h');
  const [isVerticalScrolled, setIsVerticalScrolled] = useState<boolean>(false);
  const [responseData, setResponseData] = useState([]);
  const [locker, setLocker] = useState(params?.isLocker);
  const [sample, setSample] = useState(params?.isSample);
  const [isFetch, setIsFetch] = useState(false);
  const [isNetworkRefresh, setIsNetworkRefresh] = useState(null);
  const [syncSelected, setSyncSelected] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const {seq} = useSelector((state) => state.users);

  const onSelected = (idx: number) => {
    let newArr = [...syncSelected];
    let selectedIdx = newArr.findIndex((e) => e === true);
    newArr[selectedIdx] = false;
    newArr[idx] = true;

    setSyncSelected(newArr);
  };

  // const getCropEvidence = async (date) => {
  //   try {
  //     const res = await evidenceApi.getCropEvidence(date, selectFarmSeq, seq);

  //     if (res.data.success) {
  //       const response = res.data.data.result;
  //       const resultKeys = Object.keys(response);
  //       const joinResponse = resultKeys.map((e, idx) => {
  //         if (e === TabListsJson[idx].dataKey) {
  //           return {...response[e], ...TabListsJson[idx]};
  //         }
  //       });

  //       setResponseData({...res.data.data, result: joinResponse});
  //     }
  //   } catch (e: any) {
  //     errorHandler(e.code, e.message, dispatch, navigation);
  //   } finally {
  //     setIsLoading(false);
  //     setIsFetch(false);
  //   }
  // };

  useEffect(() => {
    if (params) {
      setLocker(params?.isLocker);
      setSample(params?.isSample);
    }
  }, [params]);

  const setInitData = () => {
    setIsLoading(true);
    isNetworkConnect(setIsNetworkRefresh);
  };

  useEffect(() => {
    if (date && isFetch) {
      setInitData();
    }
  }, [isFetch]);

  useEffect(() => {
    if (date) {
      setInitData();
    }
  }, [date]);

  useEffect(() => {
    if (selectedType === 'h') {
      scrollViewRef.current?.scrollToIndex({
        index: horizontalSelected,
        animated: true,
        viewPosition: 0,
      });

      setTimeout(() => {
        setIsVerticalScrolled(false);
      }, 500);
    }

    if (!isVerticalScrolled) {
      onSelected(verticalSelected);
      sectionViewRef.current?.scrollToIndex({
        index: verticalSelected,
        animated: true,
        viewPosition: 0.5,
      });
    }

    if (!isVerticalScrolled && horizontalSelected === verticalSelected) {
      onSelected(horizontalSelected);

      if (syncSelected[horizontalSelected].selected) {
        sectionViewRef.current?.scrollToIndex({
          index: horizontalSelected,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  }, [horizontalSelected, verticalSelected, isVerticalScrolled]);

  const viewableItemsRef = useRef((info: {viewableItems: Array<ViewToken>}) => {
    if (info.viewableItems[0] && info.viewableItems[0].item) {
      setVerticalSelected(Number(info.viewableItems[0].key));
      setSelectedType('v');
    }
  });

  const horizontalRenderItem = useCallback(
    ({item}) => {
      return <HorizontalTabSection item={item} />;
    },
    [syncSelected],
  );

  const HorizontalTabSection = React.memo(({item}) => {
    return (
      <HorizontalTabContent
        selected={syncSelected[item.key]}
        activeOpacity={0.6}
        onPress={() => {
          setHorizontalSelected(item.key);
          setSelectedType('h');
          setIsVerticalScrolled(true);
        }}>
        <HorizontalTabText selected={syncSelected[item.key]}>
          {item.title}
        </HorizontalTabText>
      </HorizontalTabContent>
    );
  });

  const verticalRenderItem = useCallback(
    ({item, index}) => {
      return (
        <FlatColumnListSection>
          <EvidenceCropSectionItem value={item} index={index} sample={sample} />
        </FlatColumnListSection>
      );
    },
    [sample],
  );

  return (
    <Layout isBgWhite>
      <>
        {isLoading ? (
          <Loading loadingText="할일 목록을 가져오고 있습니다" />
        ) : (
          <>
            isNetworkRefresh === false ? (
            <NavigateNetworkCard
              isMainColor
              title={'데이터를 불러오지 못했습니다'}
              subTitle={'인터넷 연결 확인 후 다시 시도해주세요'}
              label={'다시 시도하기'}
              handleNavigate={() => {
                setIsFetch(true);
              }}
            />
            ) : (
            <>
              {responseData.result?.length > 0 && (
                <FlatListSection>
                  <FlatList
                    removeClippedSubviews
                    ref={sectionViewRef}
                    horizontal
                    data={responseData.result}
                    disableVirtualization={false}
                    initialNumToRender={5}
                    renderItem={horizontalRenderItem}
                    keyExtractor={(item) => String(item.key)}
                  />
                </FlatListSection>
              )}

              <DatePickerSection
                sample={sample}
                isCalendar
                datePickerDate={date}
                lunarDate={responseData.info?.lunarDate}
                setDate={setDate}
                isPadding={false}
                maximumDate={dayjs().format('YYYY-MM-DD')}
              />

              {responseData.result?.length > 0 && (
                <FlatList
                  removeClippedSubviews
                  ref={scrollViewRef}
                  data={responseData.result}
                  initialNumToRender={3}
                  disableVirtualization={false}
                  renderItem={verticalRenderItem}
                  keyExtractor={(item) => String(item.key)}
                  onViewableItemsChanged={viewableItemsRef.current}
                  viewabilityConfig={{
                    itemVisiblePercentThreshold: 100,
                  }}
                />
              )}

              {responseData.result?.length === 0 && (
                <FlatListSection>
                  <TodoTab1Section
                    isMainColor
                    title={'해당 날짜의 목록이'}
                    subTitle={'다른 날짜를 선택해주세요'}
                  />
                </FlatListSection>
              )}
            </>
          </>
        )}
      </>
    </Layout>
  );
};

export default TodoTab1;

export const TodoTab1Section = React.memo(({value}) => {
  return (
    <>
      <TodoTitleWrapper>
        <TodoTitle>{value.title}</TodoTitle>
      </TodoTitleWrapper>
    </>
  );
});

const TodoTitleWrapper = styled.View`
  margin-top: ${Theme.height(16)}px;
`;

const TodoTitle = styled(TextMedium)`
  font-size: ${Theme.fontSize(18)}px;
  line-height: ${Theme.fontSize(26)}px;
  margin-bottom: ${Theme.height(4)}px;
`;

const FlatListSection = styled.View`
  padding: ${Theme.height(16)}px ${Theme.width(16)}px;
`;

const FlatColumnListSection = styled.View`
  padding: 0 ${Theme.width(16)}px;
`;

const HorizontalTabContent = styled.TouchableOpacity<{selected: boolean}>`
  padding: ${Theme.height(4)}px ${Theme.width(16)}px;
  background-color: ${(props) =>
    props.selected ? `${Theme.colors.mainColor}` : '#fff'};
  border-width: 1px;
  border-color: ${Theme.colors.mainColor};
  border-radius: ${Theme.fontSize(20)}px;
  margin-right: ${Theme.width(8)}px;
`;

const HorizontalTabText = styled(TextRegular)<{selected: boolean}>`
  color: ${(props) => (props.selected ? '#fefefe' : '#005500')};
  font-size: ${Theme.fontSize(16)}px;
  line-height: ${Theme.fontSize(23)}px;
`;

const DatePickerSection = styled(DatePicker)`
  ${containerPadding}
`;
