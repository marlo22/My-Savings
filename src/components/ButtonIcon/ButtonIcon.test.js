import React from 'react';
import { shallow } from 'enzyme';

import ButtonIcon from './';

const onPress = jest.fn();
const type = 'AntDesign';
const name = 'user';
const buttonProps = { style: { color: 'red' } };
const iconProps = { style: { fontSize: 20 } };

const component = shallow(
  <ButtonIcon
    onPress={onPress}
    type={type}
    name={name}
    buttonProps={buttonProps}
    iconProps={iconProps}
  />
);

describe('ButtonIcon', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  describe('TouchableOpacity', () => {
    test('click on TouchableOpacity should call onPress callback', () => {
      const touchableOpacity = component.find('TouchableOpacity');
      touchableOpacity.simulate('press');
      expect(onPress).toHaveBeenCalled();
    });
  
    test('should set passed button props', () => {
      const touchableOpacity = component.find('TouchableOpacity');
      expect(touchableOpacity.prop('style')).toEqual(buttonProps.style);
    });
  });

  describe('Icon', () => {
    const iconDisplayName = 'Styled(Styled(Icon))';

    test('should set passed icon type', () => {
      const icon = component.find(iconDisplayName);
      expect(icon.prop('type')).toEqual(type);
    });

    test('should set passed icon name', () => {
      const icon = component.find(iconDisplayName);
      expect(icon.prop('name')).toEqual(name);
    });

    test('should set passed icon props', () => {
      const icon = component.find(iconDisplayName);
      expect(icon.prop('style')).toEqual(iconProps.style);
    });
  });
});