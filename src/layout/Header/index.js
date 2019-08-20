import React from 'react';
import PropTypes from 'prop-types';
import useRouter from 'use-react-router';
import styled from 'styled-components';

import { GlobalContextConsumer } from '../../context/Global';

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
  const { history } = useRouter();

  return (
    <GlobalContextConsumer>
      {context => (
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
            <Button onPress={context.toggleNav}>
              <Icon
                type="AntDesign"
                name={context.isNavOpen ? 'menufold' : 'menuunfold'}
              />
            </Button>
          </Right>
        </NativeBaseHeader>
      )}
    </GlobalContextConsumer>
  );
}

Header.propTypes = {
  title: PropTypes.string
};