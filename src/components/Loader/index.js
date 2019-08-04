import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, {ThemeContext } from 'styled-components';

import { Spinner } from 'native-base';

const WrapperView = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.Text`
  color: ${props => props.theme.fontColor}
  text-align: center;
`;

const Loader = ({ message }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <WrapperView>
      <Spinner color={themeContext.primaryColor} />
      <MessageText>
        {message}
      </MessageText>
    </WrapperView>
  );
}

Loader.propTypes = {
  message: PropTypes.string.isRequired
};

export default Loader;