import React from 'react';
import { shallow } from 'enzyme';

import ColorIndicator from './';

const color = '#ff0000';

const component = shallow(
  <ColorIndicator color={color} />
);

describe('ColorIndicator', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should set passed color value', () => {
    const expectedStyle = { backgroundColor: color };
    expect(component.prop('style')).toEqual(expectedStyle);
  });
});