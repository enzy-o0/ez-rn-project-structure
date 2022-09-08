import React from 'react';
import Swiper from 'react-native-swiper';
import {Modal, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {flexCenter, TextMedium, TextRegular} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';
import {useNavigation} from '@react-navigation/core';
import {CommonActions} from '@react-navigation/native';
import Event from '~/assets/images/event.svg';

interface Props {
  eventData: any;
  handleConfirm?: any;
  handleCancel: any;
  handlePressOverlay(): void;
}

const EventModal = ({
  eventData,
  handleConfirm,
  handleCancel,
  handlePressOverlay,
}: Props) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={handleConfirm}>
      <TouchableWithoutFeedback onPress={handlePressOverlay}>
        <CenterView isModal>
          <ModalView>
            <ModalContent>
              {eventData && (
                <>
                  <Swiper
                    loadMinimal={true}
                    activeDotColor={Theme.colors.mainColor}
                    autoplay
                    showsButtons={eventData.length >= 2 && true}
                    width={Theme.width(328)}
                    nextButton={<Arrow>›</Arrow>}
                    prevButton={<Arrow>‹</Arrow>}>
                    {eventData &&
                      eventData.map((event) => {
                        return (
                          <SvgImageStyle
                            key={event.seq}
                            onPress={() =>
                              navigation.dispatch(
                                CommonActions.navigate({
                                  name: 'SettingTab',
                                  params: {
                                    seq: event.seq,
                                  },
                                }),
                              )
                            }>
                            <Event />
                          </SvgImageStyle>
                        );
                      })}
                  </Swiper>
                </>
              )}
            </ModalContent>
            <ButtonRow>
              <PressBtn
                isTwoBtn={true}
                activeOpacity={0.6}
                isLeftBtn
                isRightBtn={false}
                onPress={handleCancel}>
                <ButtonCancelLabel>일주일 간 보지 않기</ButtonCancelLabel>
              </PressBtn>
              <PressBtn
                isTwoBtn={true}
                activeOpacity={0.6}
                isLeftBtn={false}
                isRightBtn
                onPress={handleConfirm}>
                <ButtonLabel>닫기</ButtonLabel>
              </PressBtn>
            </ButtonRow>
          </ModalView>
        </CenterView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EventModal;

const CenterView = styled.View<{isModal?: boolean}>`
  ${flexCenter}
  background-color: ${(props) =>
    props.isModal ? 'rgba(0, 0, 0, 0.52)' : `${Theme.colors.card}`};
`;

const ModalView = styled.View`
  width: ${Theme.width(328)}px;
  border-radius: ${Theme.fontSize(4)}px;
  border-width: 0.5px;
  background-color: snow;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalContent = styled.View`
  height: ${Theme.height(520)}px;
`;

const PressBtn = styled.TouchableOpacity<{
  isTwoBtn: boolean;
  isLeftBtn?: boolean;
  isRightBtn?: boolean;
}>`
  width: ${({isTwoBtn}) => (isTwoBtn ? '50%' : '100%')};
  background-color: ${Theme.colors.white};
  bottom: 0;
  overflow: hidden;
  border-bottom-left-radius: ${({isLeftBtn}) => (isLeftBtn ? '4px' : '0px')};
  border-bottom-right-radius: ${({isRightBtn}) => (isRightBtn ? '4px' : '0px')};
  padding: ${Theme.height(12)}px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0.5px;
  border-color: ${Theme.colors.line};
`;

const ButtonLabel = styled(TextMedium)`
  color: ${Theme.colors.mainColor};
`;

const Arrow = styled.View`
  color: ${Theme.colors.mainColor};
  font-size: 50px;
`;

const SvgImageStyle = styled.TouchableOpacity`
  flex: 1;
  height: ${Theme.height(434)}px;
`;

const ButtonRow = styled.View`
  width: 100%;
  flex-direction: row;
`;

const ButtonCancelLabel = styled(TextRegular)`
  font-size: ${Theme.fontSize(16)}px;
  line-height: ${Theme.fontSize(23)}px;
  color: ${Theme.colors.mainColor};
`;
