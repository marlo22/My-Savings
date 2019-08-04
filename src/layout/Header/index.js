import React from 'react';
import PropTypes from 'prop-types';
import useRouter from 'use-react-router';
import styled from 'styled-components';

import { View } from 'react-native';
import { Header as NativeBaseHeader, Left, Right, Body, Button, Icon, Title } from 'native-base';

const BackButton = styled(Button)`
  padding: 0 5px;
`;

const HeaderTitle = styled(Title)`
  margin: 0 5px;
`;

export default function Header({ title }) {
  const { history } = useRouter();

  return (
    <NativeBaseHeader>
      <Left>
        <BackButton onPress={history.goBack}>
          <Icon type="AntDesign" name="back" />
        </BackButton>
      </Left>
      <Body>
        <View style={{ textAlign: 'center' }}>          
          <HeaderTitle>
            {title}
          </HeaderTitle>
        </View>
      </Body>
      <Right>
        {/* Jest także ikonka "menuunfold symbolizująca zwijanie menu. */}
        <Button onPress={history.goBack}>
          <Icon type="AntDesign" name="menufold" />
        </Button>
      </Right>
    </NativeBaseHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string
};