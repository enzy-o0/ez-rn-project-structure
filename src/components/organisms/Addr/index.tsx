import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ListRenderItem,
  Pressable,
} from 'react-native';
import styled from 'styled-components/native';
import {
  Layout,
  CommonMain,
  TextRegular,
  TextMedium,
} from '~/components/styles/Mixin';
import Input from '~/components/atoms/Input';
import Theme from '~/components/styles/theme';
import UnderlineText from '~/components/atoms/UnderlineText';
import {useDispatch} from 'react-redux';

interface AddrProps {
  jibunAddr: string;
  roadAddr: string;
  roadAddrPart1: string;
}

const Addr = ({navigation, navigate, label}) => {
  const dispatch = useDispatch();
  const [userAddr, setUserAddr] = useState('');
  const [addrList, setAddrList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalCurrentCount, setTotalCurrentCount] = useState(0);
  const debouncedSearchInput = useQueryDebounce(userAddr, 200);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const handleChangeAddrSearch = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const {text} = e.nativeEvent;

    setUserAddr(text);
  };

  useEffect(() => {
    if (debouncedSearchInput.length >= 5) {
      getAddrData(debouncedSearchInput, 1, false);
    } else {
      setAddrList([]);
      setTotalCount(0);
      setTotalCurrentCount(0);
    }
  }, [debouncedSearchInput]);

  const geAddrData = async (addr, cur, isRefreshed) => {
  //   try {
  //     const res = await addrApi.getAddr(addr, cur);
  //     if (res.data.success) {
  //       if (res.data.result?.length > 0) {
  //         if (isRefreshed) {
  //           setCurrentPage((prev) => prev + 1);
  //           setAddrList([...addrList, ...res.data.result]);
  //           setTotalCurrentCount((prev) => prev + res.data.result.length);
  //         } else {
  //           setCurrentPage(1);
  //           setAddrList(res.data.result);
  //           setTotalCount(res.data.totalCount);
  //           setTotalCurrentCount(res.data.result.length);
  //         }
  //       } else if (res.data.message) {
  //         setAddrList([]);
  //         showToast(res.data.message);
  //       } else {
  //         setAddrList([]);
  //         setTotalCount(0);
  //         setCurrentPage(1);
  //         setTotalCurrentCount(0);
  //       }
  //     } else {
  //       setAddrList([]);
  //       showToast(res.data.data.message);
  //     }
  //   } catch (e: any) {
  //     errorHandler(e.code, e.message, dispatch, navigation);
  //   } finally {
  //     setLoadMoreLoading(false);
  //   }
  };
  const handleLoadMoreAddrs = () => {
    if (!loadMoreLoading) {
      if (totalCurrentCount >= 10 && totalCount >= totalCurrentCount) {
        setLoadMoreLoading(true);
        // getUserAddrData(userAddr, currentPage + 1, true);
      }
    }
  };

  const renderItem: ListRenderItem<AddrProps> = ({item}) => {
    return (
      <ListWrapper
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate(navigate, {
            jibun: item.jibunAddr,
          });
        }}>
        <ListTitle>{item.jibunAddr}</ListTitle>
        <ListsubTitle>{item.roadAddr}</ListsubTitle>
      </ListWrapper>
    );
  };

  return (
    <>
      <Layout isBgWhite>
        <Pressable onPress={Keyboard.dismiss}>
          <Main>
            <AddrInput
              labelText={label}
              placeholder="주소를 5글자 이상 입력해주세요"
              value={userAddr}
              onChange={handleChangeAddrSearch}
              keyboardType="default"
              isAddress
            />
            {userAddr.length < 5 || addrList === '검색 결과가 없습니다' ? (
              <>
                <InputEmptyText>
                  <InputEmptyText highlight>
                    지역명, 도로명, 건물명, 건물번호를 조합
                  </InputEmptyText>
                  하여{'\n'}
                  검색하시면 더 정확한 결과가 표출됩니다
                </InputEmptyText>
              </>
            ) : (
              <>
                <FlatList
                  data={addrList}
                  renderItem={renderItem}
                  keyExtractor={(item) => String(item.roadAddrPart1)}
                  onEndReached={handleLoadMoreAddrs}
                  ListFooterComponent={
                    <>
                      <FlatListFooter />
                    </>
                  }
                />
              </>
            )}
          </Main>
        </Pressable>
      </Layout>
    </>
  );
};

export default Addr;

export const useQueryDebounce = (value: string, delay = 200) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

const Main = styled(CommonMain)`
  margin-top: ${Theme.height(60)}px;
  margin-bottom: ${Theme.height(150)}px;
`;

const AddrInput = styled(Input)`
  margin-bottom: ${Theme.height(24)}px;
`;

const InputEmptyText = styled(TextMedium)<{highlight?: boolean}>`
  color: ${({highlight}) =>
    highlight ? Theme.colors.mainColor : Theme.colors.subText};
  font-size: ${Theme.fontSize(14)}px;
`;

const ListWrapper = styled.TouchableOpacity`
  padding-top: ${Theme.height(7)}px;
  padding-bottom: ${Theme.height(11)}px;
`;

const ListTitle = styled(TextMedium)`
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.black};
`;

const ListsubTitle = styled(TextRegular)`
  font-size: ${Theme.fontSize(14)}px;
  margin-top: ${Theme.height(4)}px;
  color: ${Theme.colors.subText};
`;

const FlatListFooter = styled.View`
  height: ${Theme.height(12)}px;
`;
