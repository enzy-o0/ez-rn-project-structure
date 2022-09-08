import React from 'react';
import {Modal, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {flexCenter, TextMedium} from '~/components/styles/Mixin';
import Theme from '~/components/styles/theme';

interface PickerProps {
  pickerItems?: [];
  onValueChange: () => void;
  handleCancel: () => void;
  handlePressOverlay: () => void;
}

export const PickerModal = ({
  pickerItems,
  onValueChange,
  handleCancel,
  handlePressOverlay,
}: PickerProps) => {
  return (
    <Modal animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={handlePressOverlay}>
        <CenterView isModal>
          <ModalPickerView>
            <PickerItemView>
              {pickerItems?.map((res: any) => {
                return (
                  <ModalPickerWrapper
                    key={res.value}
                    onPress={() => {
                      onValueChange(res.value);
                      handleCancel();
                    }}>
                    <ContentWrapper>
                      <Content>{res.label}</Content>
                    </ContentWrapper>
                  </ModalPickerWrapper>
                );
              })}
            </PickerItemView>
          </ModalPickerView>
        </CenterView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const CenterView = styled.View<{isModal?: boolean}>`
  ${flexCenter}
  background-color: ${(props) =>
    props.isModal ? 'rgba(0, 0, 0, 0.52)' : 'transparent'};
`;

const ModalPickerView = styled.View`
  position: relative;
  width: ${Theme.width(296)}px;
  background-color: #ffffff;
  border-radius: ${Theme.fontSize(4)}px;
  padding: ${Theme.height(20)}px;
`;

const PickerItemView = styled.ScrollView`
  max-height: ${Theme.height(600)}px;
`;

const ModalPickerWrapper = styled.TouchableOpacity`
  flex-direction: row;
`;

const Content = styled(TextMedium)`
  padding: ${Theme.height(16)}px 0;
`;

const ContentWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
