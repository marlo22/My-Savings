import React from 'react';
import { useHistory } from 'react-router-native';
import { shallow } from 'enzyme';

import Header from './';

const toggleNav = jest.fn();
const isNavOpen = false;

const useContext = jest
  .spyOn(React, 'useContext')
  .mockImplementation(() => ({
    toggleNav,
    isNavOpen
  }));

const goBack = jest.fn();

useHistory.mockImplementation(() => ({
  goBack
}));

const title = 'Dashboard';
const hasNavMenu = true;

const setup = () => shallow(
  <Header
    title={title}
    hasNavMenu={hasNavMenu}
  />
);

let component = setup();

describe('<Header />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('click back button should call go back router\'s function', () => {
    const backBtn = component.find('Styled(Styled(Button))');
    backBtn.simulate('press');
    expect(goBack).toHaveBeenCalled();
  });

  test('should render passed header title', () => {
    const header = component.find('Styled(Styled(Title))');
    expect(header.text()).toBe(title);
  });

  test('click navigation button should call toggleNav context\'s function', () => {
    const navBtn = component.find('Styled(Button)');
    navBtn.simulate('press');
    expect(toggleNav).toHaveBeenCalled();
  });

  test('if nav menu is close should render "menuunfold" icon', () => {
    const menuIcon = component.find('Styled(Icon)').last();
    expect(menuIcon.prop('name')).toBe('menuunfold');
  });

  test('if nav menu is open should render "menufold" icon', () => {
    useContext.mockImplementation(() => ({
      toggleNav,
      isNavOpen: true
    }));

    component = setup();

    const menuIcon = component.find('Styled(Icon)').last();
    expect(menuIcon.prop('name')).toBe('menufold');
  });

  test('if hasNavMenu prop is falsy should not render toggle navigation button', () => {
    component.setProps({ hasNavMenu: false });

    const navBtn = component.find('Styled(Button)');    
    expect(navBtn).toHaveLength(0);
  });
});