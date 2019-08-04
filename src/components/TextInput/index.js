import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { View } from 'react-native';
import { Item, Label, Input, Icon, Form } from 'native-base';

const iconTypes = {
  valid: 'checkmark-circle',
  invalid: 'close-circle'
};

const feedbackColor = {
  valid: 'green',
  invalid: 'red'
}

const FeedbackIcon = styled(Icon)`
  color: ${({ status }) => feedbackColor[status]};
`;

const Message  = styled.Text`
  color: ${({ status }) => feedbackColor[status] || 'black'};
  text-align: right;
  margin-right: 10px;
`;

const TextInput = ({ label, validation = {}, itemProps = {}, labelProps = {}, inputProps = {} }) => {
  const { status, message } = validation;
  const iconName = iconTypes[status];

  return (
    <>
      <Label {...labelProps}>
        {label}
      </Label>
      <Input {...inputProps} style={{ border: 'solid 1px red' }} />
      {iconName && <FeedbackIcon name={iconName} status={status} />}
    </>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelProps: PropTypes.object,
  inputProps: PropTypes.object.isRequired,
  validation: PropTypes.shape({
    isValid: PropTypes.bool.isRequired,
    message: PropTypes.string
  })
};

export default TextInput;