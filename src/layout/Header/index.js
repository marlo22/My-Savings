import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useRouter from 'use-react-router';
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

export default function Header({ title }) {
  const { toggleNav, isNavOpen } = useContext(globalContext)
  const { history } = useRouter();

  return (
    <NativeBaseHeader>
      <Left>
        <BackButton onPress={history.goBack}>
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
        <Button onPress={toggleNav}>
          <Icon
            type="AntDesign"
            name={isNavOpen ? 'menufold' : 'menuunfold'}
          />
        </Button>
      </Right>
    </NativeBaseHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string
};