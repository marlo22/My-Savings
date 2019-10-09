import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-native';
import styled from 'styled-components';

import globalContext from '../../context/Global';

import { Header as NativeBaseHeader, Left, Right, Body, Button, Icon, Title } from 'native-base';

const BackButton = styled(Button)`
  padding: 0 5px;
`;

const HeaderWrapper = styled.View`
  text-align: center;
`;

const HeaderTitle = styled(Title)`
  margin: 0 5px;
`;

export default function Header({ title, hasNavMenu }) {
  const { toggleNav, isNavOpen } = useContext(globalContext)
  const { goBack } = useHistory();

  return (
    <NativeBaseHeader>
      <Left>
        <BackButton onPress={goBack}>
          <Icon type="AntDesign" name="back" />
        </BackButton>
      </Left>
      <Body>
        <HeaderWrapper>
          <HeaderTitle>
            {title}
          </HeaderTitle>
        </HeaderWrapper>
      </Body>
      <Right>
        {hasNavMenu && (
          <Button onPress={toggleNav}>
            <Icon
              type="AntDesign"
              name={isNavOpen ? 'menufold' : 'menuunfold'}
            />
          </Button>
        )}
      </Right>
    </NativeBaseHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  hasNavMenu: PropTypes.bool.isRequired
};