import React from 'react';
import { shallow } from 'enzyme';
import InputMessage from './';

const message = 'Lorem ipsum';

const component = shallow(
  <InputMessage message={message} />
);

describe('<InputMessage />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should print passed message', () => {
    expect(component.text()).toBe(message);
  });

  test('without message prop should return null', () => {
    component.setProps({ message: null });

    expect(component.html()).toBe(null);
  });
});