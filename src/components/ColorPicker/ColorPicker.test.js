import React from 'react';
import { shallow } from 'enzyme';

import ColorPicker from './';

const buttonDisplayName = 'Styled(Styled(Button))';

const onOk = jest.fn();
const onClose = jest.fn();
const pickerProps = { defaultColor: '#ff0000' };

const component = shallow(
  <ColorPicker
    onOk={onOk}
    onClose={onClose}
    pickerProps={pickerProps}
  />
);

describe('ColorPicker', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should set passed picker props', () => {
    const picker = component.find('TriangleColorPicker');
    expect(picker.prop('defaultColor')).toBe(pickerProps.defaultColor);
  });

  test('pickerColorChange should change value', () => {
    const hsvValue = { h: 134, s: 14, v: 35 };
    const hexValue = '#4d5950';

    const picker = component.find('TriangleColorPicker');
    picker.props().onColorChange(hsvValue);
    
    const saveButton = component.find(buttonDisplayName).last();
    saveButton.simulate('press');
    expect(onOk).toHaveBeenCalledWith(hexValue);
  });

  describe('buttons', () => {
    afterEach(() => {
      onOk.mockClear();
      onClose.mockClear();
    });

    test('click first button should call onClose function', () => {
      const button = component.find(buttonDisplayName).first();
      
      button.simulate('press');
      expect(onClose).toHaveBeenCalled();
    });

    test('click last button should call onOk and onClose function', () => {
      const button = component.find(buttonDisplayName).last();
      
      button.simulate('press');
      expect(onOk).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});