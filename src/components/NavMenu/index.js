import React, { useContext } from 'react';
import styled from 'styled-components';
import useRouter from 'use-react-router';

import globalContext from '../../context/Global';

import { Container } from 'native-base';
import { NavMenuItem } from '../';

import logout from '../../api/logout';

import { secondaryColor } from '../../themes';

const NavMenuWrapper = styled(Container)`
  background-color: ${secondaryColor};
  color: #ffffff;
  width: 80%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const NavMenu = () => {
  const { toggleNav, isNavOpen } = useContext(globalContext);
  const { history } = useRouter();

  const menuItems = [
    { text: 'Pulpit', iconName: 'home', onPress: () => console.warn('go to dashboard') },
    { text: 'Limity', iconName: 'timer', onPress: () => console.warn('go to limits') },
    { text: 'Wydatki', iconName: 'cash', onPress: () => console.warn('go to spendings') },
    { text: 'Kategorie', iconName: 'folder-open', onPress: () => console.warn('go to categories') },
    { text: 'Statystyki', iconName: 'stats', onPress: () => console.warn('go to stats') },
    { text: 'Ustawienia', iconName: 'settings', onPress: () => console.warn('go to settings') },
    { text: 'Wyloguj', iconName: 'person', onPress: () => logout({ push: history.push }) }
  ];

  // Proxy to disable navigation after click nav link.
  const onPressProxy = async onPressFn => {
    await onPressFn();
    toggleNav();
  }

  return isNavOpen ? (
    <NavMenuWrapper>
      {menuItems.map(item =>
        <NavMenuItem
          key={item.text}
          {...item}
          onPress={() => onPressProxy(item.onPress)}
        />
      )}
    </NavMenuWrapper>
  ) : null;
}

export default NavMenu;