import React from 'react';
import { shallow } from 'enzyme';

import NavMenu from './';

jest.mock('../../api/logout', () => jest.fn());

const toggleNav = jest.fn();

jest
  .spyOn(React, 'useContext')
  .mockImplementationOnce(() => ({
    isNavOpen: true,
    toggleNav
  }));

const setup = () => shallow(
  <NavMenu />
);

let component = setup();

describe('<NavMenu />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('click menu item should call toggleNav context\'s function', () => {
    const menuItem = component.find('NavMenuItem').last();
    menuItem.simulate('press');
    setTimeout(() => expect(toggleNav).toHaveBeenCalled());
  });

  test('if nav is close should return null', () => {
    jest
      .spyOn(React, 'useContext')
      .mockImplementationOnce(() => ({
        isNavOpen: false,
        toggleNav
      }));

    component = setup();

    expect(component.html()).toBe(null);
  });

  // @TODO - test asynchronous onPressProxy
});