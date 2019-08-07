import React from 'react';
import { shallow } from 'enzyme';
import InputIcon from './';

const component = shallow(
  <InputIcon status={true} />
);

describe('<InputIcon />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('if status is "true" should return checkmark-circle Icon', () => {
    expect(component.prop('name')).toBe('checkmark-circle');
  });

  test('if status is "false" should return close-circle Icon', () => {
    component.setProps({ status: false });

    expect(component.prop('name')).toBe('close-circle');
  });

  test('if status is "undefined" should return null', () => {
    component.setProps({ status: undefined });

    expect(component.html()).toBe(null);
  });
});