import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const InputMessageText = styled.Text`
  color: red;
  align-self: flex-end;
  margin-right: 5px;
`;

const InputMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <InputMessageText>
      {message}
    </InputMessageText>
  );
};

InputMessage.propTypes = {
  message: PropTypes.string
};

export default InputMessage;