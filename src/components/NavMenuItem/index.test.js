import React from 'react';
import { shallow } from 'enzyme';

import NavMenuItem from './';

const onPress = jest.fn();
const iconName = 'smile';
const text = 'Hello world';

const component = shallow(
  <NavMenuItem
    onPress={onPress}
    iconName={iconName}
    text={text}
  />
);

describe('<NavMenuItem />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should set passed text', () => {
    const textComponent = component.find('Text');
    expect(textComponent.prop('children')).toBe(text);
  });

  test('should set passed icon', () => {
    const icon = component.find('Styled(Icon)');
    expect(icon.prop('name')).toBe(iconName);
  });
});