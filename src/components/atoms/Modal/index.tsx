import React from 'react';
import {Modal, Keyboard} from 'react-native';
import styled from 'styled-components/native';
import {
  Divider,
  flexCenter,
  TextMedium,
  TextRegular,
} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';

interface Props {
  label: string;
  modalTextLabel: string;
  modalSubTextLabel?: string;
  isVisible?: boolean;
  handleConfirm?: any;
  isTwoBtn?: boolean;
  handleCancel?: any;
  cancelLabel?: string;
  isSubTitle?: boolean;
  isMainColor?: boolean;
  boldLabel?: boolean;
}

export const CommonModal = ({
  label,
  modalTextLabel,
  isVisible,
  handleConfirm,
  isTwoBtn,
  handleCancel,
  cancelLabel,
  isSubTitle,
  modalSubTextLabel,
  isMainColor,
  boldLabel = false,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={isTwoBtn ? handleCancel : handleConfirm}>
      <CenterView isModal>
        <ModalView>
          <ModalContent>
            <ModalText isTitle>{modalTextLabel}</ModalText>
            {isSubTitle && (
              <ModalText isMainColor={isMainColor} isTitle={false}>
                {modalSubTextLabel}
              </ModalText>
            )}
          </ModalContent>
          {isTwoBtn ? (
            <ButtonRow>
              <PressBtn
                activeOpacity={0.6}
                isLeftBtn
                isRightBtn={false}
                isTwoBtn={isTwoBtn}
                onPress={handleCancel}>
                <ButtonLabel isCancelBtn>{cancelLabel}</ButtonLabel>
              </PressBtn>
              <PressBtn
                activeOpacity={0.6}
                isLeftBtn={false}
                isRightBtn
                isTwoBtn={isTwoBtn}
                onPress={handleConfirm}>
                {boldLabel ? (
                  <BoldButtonLabel>{label}</BoldButtonLabel>
                ) : (
                  <RegularButtonLabel>{label}</RegularButtonLabel>
                )}
              </PressBtn>
            </ButtonRow>
          ) : (
            <PressBtn
              activeOpacity={0.6}
              isTwoBtn={false}
              onPress={handleConfirm}>
              <ButtonLabel>{label}</ButtonLabel>
            </PressBtn>
          )}
        </ModalView>
      </CenterView>
    </Modal>
  );
};

export const SelectDateModal = ({isVisible, setIsVisible, setDate, data}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible();
      }}>
      <CenterView
        isModal
        onPress={() => {
          setIsVisible();
          Keyboard.dismiss;
        }}>
        <ModalView>
          <PickerContainer>
            {data.map((e) => {
              return (
                <>
                  <PickerItems
                    activeOpacity={0.6}
                    onPress={() => {
                      setIsVisible();
                      setDate(e.key);
                    }}>
                    <TextMedium>{e.label}</TextMedium>
                  </PickerItems>
                  <Divider />
                </>
              );
            })}
          </PickerContainer>
        </ModalView>
      </CenterView>
    </Modal>
  );
};

const CenterView = styled.Pressable<{isModal?: boolean}>`
  ${flexCenter}
  background-color: ${(props) =>
    props.isModal ? 'rgba(0, 0, 0, 0.52)' : 'transparent'};
`;

const ModalView = styled.View`
  width: ${Theme.width(328)}px;
  border-radius: ${Theme.fontSize(4)}px;
  border-width: 0.5px;
  border-color: ${Theme.colors.line};
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.View`
  padding: ${Theme.height(45)}px ${Theme.width(16)}px;
`;

const ModalText = styled(TextMedium)<{isTitle: boolean; isMainColor?: boolean}>`
  font-size: ${({isTitle}) =>
    isTitle ? `${Theme.fontSize(18)}px;` : `${Theme.fontSize(16)}px`};
  line-height: ${({isTitle}) =>
    isTitle ? `${Theme.fontSize(27)}px;` : `${Theme.fontSize(23)}px`};
  margin-top: ${({isTitle}) => (isTitle ? '0px' : `${Theme.height(16)}px`)};
  color: ${({isTitle, isMainColor}) =>
    isTitle
      ? Theme.colors.black
      : !isMainColor
      ? Theme.colors.subText
      : Theme.colors.mainColor};
  font-weight: ${({isTitle}) => (isTitle ? '500' : 'normal')};
  text-align: center;
`;

const ButtonRow = styled.View`
  width: 100%;
  flex-direction: row;
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
  border-bottom-left-radius: ${({isLeftBtn}) =>
    isLeftBtn ? `${Theme.fontSize(4)}px` : '0px'};
  border-bottom-right-radius: ${({isRightBtn}) =>
    isRightBtn ? `${Theme.fontSize(4)}px` : '0px'};
  padding: ${Theme.height(12)}px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 0.5px;
  border-color: ${Theme.colors.line};
`;

const ButtonLabel = styled.Text<{isCancelBtn?: boolean}>`
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.mainColor};
  font-weight: ${({isCancelBtn}) => (isCancelBtn ? 'normal' : '500')};
`;

const RegularButtonLabel = styled(TextRegular)`
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.mainColor};
`;

const BoldButtonLabel = styled(TextMedium)`
  font-size: ${Theme.fontSize(16)}px;
  color: ${Theme.colors.mainColor};
`;

const PickerContainer = styled.ScrollView`
  z-index: 999;
  background-color: ${Theme.colors.white};
  border-bottom-color: ${Theme.colors.line};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-radius: ${Theme.fontSize(4)}px;
  max-height: ${Theme.height(550)}px;
`;

const PickerItems = styled.TouchableOpacity`
  padding: ${Theme.height(16)}px ${Theme.width(8)}px;
`;
