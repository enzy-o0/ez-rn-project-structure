import React, {ReactElement, useCallback} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

import Theme from '~/components/styles/theme';
import {TextMedium} from '~/components/styles/Mixin';
import {Divider} from '~/components/styles/Mixin';
import PlaceHolder from '~/assets/images/placeholder.svg';


interface IconIProps {
  icon: ReactElement;
  isMargin: boolean;
}

export const IconCard = ({icon, isMargin, ...props}: IconIProps) => {
  return (
    <IconMain isMargin={isMargin} {...props}>
      {icon}
    </IconMain>
  );
};

export const SimpleCard = ({
  isSimpleCard = false,
  farmlandNickname,
  farmlandAddress,
  handleNavigatePress,
  ...props
}) => {
  const handleNavigate = useCallback(
    handleNavigatePress && debounce(handleNavigatePress, 3000),
    [],
  );

  return (
    <Header isSimpleCard={isSimpleCard} {...props}>
      <HeaderCol isIcon onPress={handleNavigate}>
        <PlaceHolder width={Theme.fontSize(60)} height={Theme.fontSize(60)} />
      </HeaderCol>
      <HeaderCol>
        <HeaderRowSpace>
          <HeaderRow onPress={handleNavigate}>
            <CardText isTitleFontSize isTitle>
              {farmlandNickname}
            </CardText>
          </HeaderRow>
        </HeaderRowSpace>
        <HeaderRow onPress={handleNavigate}>
          <CardText isTitle isSubTextColor>
            {farmlandAddress}
          </CardText>
        </HeaderRow>
      </HeaderCol>
    </Header>
  );
};

export const Card = ({
  key,
  farmlandNickname,
  farmlandAddress,
  handlePress,
  todoList,
  isSelected,
  isSimpleCard,
  handleModifyPress,
  handleDeletePress,
  deleteFarmland,
  handleNavigatePress,
  ...props
}) => {
  return (
    <View {...props}>
      <CardWrapper isSelected={isSelected} isSimpleCard={isSimpleCard}>
        <SimpleCard
          isSimpleCard={false}
          deleteFarmland={deleteFarmland}
          farmlandNickname={farmlandNickname}
          farmlandAddress={farmlandAddress}
          handleModifyPress={handleModifyPress}
          handleDeletePress={handleDeletePress}
          handleNavigatePress={handleNavigatePress}
        />
        <Divider />
        <Body>
          <TodoListCol>
            {todoList.map((todo, index) => {
              return (
                <TodoListRow key={todo + index}>
                  <ListStyle />
                  <CardText isListItem key={index}>
                    {todo}
                  </CardText>
                </TodoListRow>
              );
            })}
          </TodoListCol>
        </Body>
      </CardWrapper>
      <CardButton activeOpacity={0.6} onPress={handlePress}>
        <CardButtonLabel>보러가기</CardButtonLabel>
      </CardButton>
    </View>
  );
};


const IconMain = styled.View<{isMargin: boolean}>`
  width: ${Theme.width(160)}px;
  background-color: ${Theme.colors.white};
  margin-bottom: ${({isMargin}) => (isMargin ? `${Theme.height(8)}px` : 0)};
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.View<{isSelected: boolean; isSimpleCard: boolean}>`
  flex-direction: column;
  border: ${({isSelected}) =>
    isSelected
      ? `1px solid ${Theme.colors.mainColor}`
      : `1px solid ${Theme.colors.line}`};
  border-top-right-radius: ${Theme.fontSize(4)}px;
  border-top-left-radius: ${Theme.fontSize(4)}px;
  border-bottom-width: ${({isSimpleCard}) => (isSimpleCard ? '1px' : '0')};
  border-bottom-right-radius: ${({isSimpleCard}) =>
    isSimpleCard ? `${Theme.fontSize(4)}px` : '0'};
  border-bottom-left-radius: ${({isSimpleCard}) =>
    isSimpleCard ? `${Theme.fontSize(4)}px` : '0'};
`;

const Header = styled.View<{isSimpleCard: boolean}>`
  flex-direction: row;
  padding: ${Theme.height(12)}px ${Theme.width(8)}px ${Theme.height(8)}px
    ${Theme.width(8)}px;
  justify-content: space-between;
  border: ${({isSimpleCard}) =>
    isSimpleCard ? `1px solid ${Theme.colors.mainColor}` : 'none'};
  border-radius: ${(isSimpleCard) =>
    isSimpleCard ? `${Theme.fontSize(4)}px` : 'none'};
  width: ${Theme.width(328)}px;
`;

const HeaderCol = styled.Pressable<{isIcon?: boolean}>`
  flex-direction: column;
  width: ${({isIcon}) => (isIcon ? `${Theme.width(69)}px` : 'auto')};
  align-items: ${({isIcon}) => (isIcon ? 'center' : 'stretch')};
`;

const HeaderRow = styled.Pressable`
  flex-direction: row;
`;

const HeaderRowSpace = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${Theme.width(231)}px;
`;

const CardText = styled(TextMedium)<{
  isTitle?: boolean;
  isTitleFontSize?: boolean;
  isSmallFontSize?: boolean;
  isSubTextColor?: boolean;
  isModifyML?: boolean;
  isListItem?: boolean;
  cultivarName?: boolean;
  isCultivalFontSize?: boolean;
}>`
  margin-bottom: ${({isTitle}) => (isTitle ? `${Theme.height(8)}px` : 0)};
  font-size: ${({isSmallFontSize, isTitleFontSize, isCultivalFontSize}) =>
    isSmallFontSize || isCultivalFontSize
      ? `${Theme.fontSize(12)}px`
      : isTitleFontSize
      ? `${Theme.fontSize(16)}px`
      : `${Theme.fontSize(14)}px`};
  font-weight: ${({isTitleFontSize}) => (isTitleFontSize ? '500' : '400')};
  color: ${({isSubTextColor}) =>
    isSubTextColor ? Theme.colors.subText : Theme.colors.black};
  width: ${({isTitle, isSmallFontSize, isListItem}) =>
    isTitle
      ? `${Theme.width(180)}px`
      : isSmallFontSize
      ? `${Theme.width(23)}px`
      : isListItem
      ? `${Theme.width(288)}px`
      : 'auto'};
  flex-wrap: wrap;
  margin-left: ${({isModifyML}) => (isModifyML ? `${Theme.width(4)}px` : 0)};
  text-align: ${({cultivarName}) => (cultivarName ? 'center' : 'left')};
`;

const Body = styled.View`
  padding: ${Theme.height(12)}px ${Theme.width(8)}px 0px ${Theme.width(20)}px;
`;

const TodoListCol = styled.View`
  align-items: center;
  margin-bottom: ${Theme.height(12)}px;
`;

const TodoListRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Theme.height(12)}px;
`;

const ListStyle = styled.View`
  width: ${Theme.width(4)}px;
  height: ${Theme.width(4)}px;
  background-color: ${Theme.colors.mainColor};
  margin-right: ${Theme.width(12)}px;
  border-radius: ${Theme.fontSize(2)}px;
`;

const CardButton = styled.TouchableOpacity`
  padding: ${Theme.height(12)}px 0;
  background-color: rgb(240, 245, 240);
  border: 1px solid ${Theme.colors.mainColor};
`;

const CardButtonLabel = styled(TextMedium)`
  text-align: center;
  color: ${Theme.colors.mainColor};
  font-size: ${Theme.fontSize(14)}px;
`;
