import React, {useState, useEffect} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import styled from 'styled-components/native';
import {TextMedium, TextRegular} from '~/components/styles/Mixin';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import {Line} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import Arrow from '~/assets/images/icon_setting_notice_arrow.svg';

type AccordionResponseType = {
  seq: string;
  title: string;
  content: string;
};

export interface AccordionResponse {
  data: AccordionResponseType[];
  success: boolean;
}

interface IProps {
  data: any;
  isFetch: boolean;
  setIsFetch: any;
  dataAPI: any;
  seq?: number;
}

const Accordion = ({
  data,
  isFetch,
  setIsFetch,
  dataAPI,
  seq,
}: IProps): JSX.Element => {
  const [expandedIndex, setExpandedIndex] = useState<boolean[]>([]);

  useEffect(() => {
    if (seq) {
      let dataIndex;
      dataIndex = data.findIndex((e) => e.seq === seq);
      let dataLength = new Array(data.length).fill(false);
      dataLength[dataIndex] = true;
      setExpandedIndex(dataLength);
    }
  }, [seq]);

  const onRefresh = () => {
    setIsFetch(true);
    dataAPI();
  };

  const renderItem: ListRenderItem<AccordionResponseType> = ({item, index}) => {
    return (
      <Collapse
        isExpanded={expandedIndex[index]}
        touchableOpacityProps={{activeOpacity: 1}}
        onToggle={(isExpanded: boolean) => {
          let newArr = [...expandedIndex];
          newArr[index] = isExpanded;
          setExpandedIndex(newArr);
        }}>
        <CollapseHeader>
          <Header>
            <ContentTitle>
              <Date>{item.create_date}</Date>
              <AnswerToggleRow>
                <Title>{item.title}</Title>
              </AnswerToggleRow>
            </ContentTitle>
          </Header>
        </CollapseHeader>

        <CollapseBody>
          <Body>
            <ContentText>{item.content}</ContentText>
          </Body>
        </CollapseBody>
      </Collapse>
    );
  };

  return (
    <FlatList
      keyExtractor={(item: AccordionResponseType) => item.seq}
      data={data}
      onRefresh={onRefresh}
      refreshing={isFetch}
      renderItem={renderItem}
    />
  );
};

export default Accordion;

const Header = styled.View`
  width: 100%;
  padding: ${Theme.height(8)}px ${Theme.width(16)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: ${Theme.colors.line};
  border-bottom-width: 1px;
`;

const ContentTitle = styled.View`
  width: 100%;
`;

const Date = styled(TextRegular)`
  font-size: ${Theme.fontSize(14)}px;
  margin-bottom: ${Theme.height(4)}px;
  color: ${Theme.colors.subText};
  line-height: ${Theme.fontSize(21)}px;
`;

const Title = styled(TextRegular)`
  width: ${Theme.width(296)}px;
  font-size: ${Theme.fontSize(16)}px;
  margin-bottom: ${Theme.height(8)}px;
  color: ${Theme.colors.black};
`;

const AnswerToggleRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.View`
  background-color: ${Theme.colors.bg};
  padding: ${Theme.height(16)}px ${Theme.width(16)}px;
`;

const ContentText = styled(TextRegular)`
  font-size: ${Theme.fontSize(14)}px;
  color: ${Theme.colors.black};
`;

