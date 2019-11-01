import React from 'react';
import { shallow } from 'enzyme';
import Loader from './';

const message = 'Lorem ipsum';
const primaryColor = '#ff0000';
const fontColor = '#000000';

jest
  .spyOn(React, 'useContext')
  .mockImplementationOnce(() => ({
    primaryColor,
    fontColor
  }));

const component = shallow(
  <Loader message={message} />
);

describe('<Loader />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should set primary color as Spinner color', () => {
    const spinner = component.find('Styled(Spinner)');
    expect(spinner.prop('color')).toBe(primaryColor);
  });

  test('should set primary color as Spinner color', () => {
    const messageText = component.find('Styled(Text)').last();
    expect(messageText.text()).toBe(message);
  });
});