import React from 'react';
import { mount } from 'enzyme';
import Loader from './';
import { ThemeContext } from 'styled-components/native';

const message = 'Lorem ipsum';
const primaryColor = '#ff0000';
const fontColor = '#000000';

const component = mount(
  <ThemeContext.Provider value={{ primaryColor, fontColor }}>
    <Loader message={message} />
  </ThemeContext.Provider>
);

describe('<Loader />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should set primary color as Spinner color', () => {
    const spinner = component.find('Spinner');
    expect(spinner.prop('color')).toBe(primaryColor);
  });

  test('should set primary color as Spinner color', () => {
    const messageText = component.find('Text').last();
    expect(messageText.text()).toBe(message);
  });
});