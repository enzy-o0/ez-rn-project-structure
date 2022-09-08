import React from 'react';
import {CommonModal} from '~/components/atoms/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {setClear, setIsNotVisibleModal} from '~/reducers/ErrorSlice';
import {useNavigation} from '@react-navigation/native';

const ErrorModal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isVisibleErrorModal, isErrorMsg} = useSelector(
    (state) => state.ErrorMessage,
  );

  return (
    <>
      {isVisibleErrorModal && (
        <CommonModal
          isTwoBtn={false}
          label="확인"
          modalTextLabel={isErrorMsg}
          isSubTitle={false}
          handleConfirm={() => {
            dispatch(setIsNotVisibleModal());
            dispatch(setClear());
            navigation.pop();
          }}
        />
      )}
    </>
  );
};

export default ErrorModal;
