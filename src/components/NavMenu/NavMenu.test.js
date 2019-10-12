import React from 'react';
import { mount as shallow } from 'enzyme';

import NavMenu from './';
import GlobalContext from '../../context/Global';

jest.mock('../../api/logout', () => jest.fn());

const toggleNav = jest.fn();

const component = shallow(
  <GlobalContext.Provider value={{
    isNavOpen: true,
    toggleNav
  }}>
    <NavMenu />
  </GlobalContext.Provider>
);

describe('<NavMenu />', () => {
  afterAll(() => {
    jest.unmock('../../api/logout');
  });

  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  // @TODO - test asynchronous onPressProxy
});