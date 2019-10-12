import React from 'react';
import { mount as shallow } from 'enzyme';

import TextInput from './';
jest.spyOn(console, 'error').mockImplementation(() => null);

const label = 'E-mail';
const labelProps = { style: { color: 'red' } };
const inputProps = { disabled: true };
const validation = { status: 'valid' };
const feedbackIconDisplayName = 'Styled(Icon)';

const component = shallow(
  <TextInput
    label={label}
    labelProps={labelProps}
    inputProps={inputProps}
    validation={validation}
  />
);

describe('<TextInput />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should set passed label', () => {
    const labelComponent = component.find('Label');
    expect(labelComponent.text()).toBe(label);
  });

  test('should set passed labelProps', () => {
    const labelComponent = component.find('Label');
    expect(labelComponent.prop('style')).toContain(labelProps.style);
  });

  test('should set passed inputProps', () => {
    const input = component.find('Input');
    expect(input.prop('disabled')).toBe(inputProps.disabled);
  });

  test('should set "checkmark-circle" icon if validation status is set as valid', () => {
    const feedbackIcon = component.find(feedbackIconDisplayName);
    expect(feedbackIcon.prop('name')).toBe('checkmark-circle');
    expect(feedbackIcon.prop('status')).toBe('valid');
  });

  test('should set "close-circle" icon if validation status is set as valid', () => {
    component.setProps({ validation: { status: 'invalid' } });
    
    const feedbackIcon = component.find(feedbackIconDisplayName);
    expect(feedbackIcon.prop('name')).toBe('close-circle');
    expect(feedbackIcon.prop('status')).toBe('invalid');
  });

  test('should not render icon if validation status is not set', () => {
    component.setProps({ validation: undefined });
    
    const feedbackIcon = component.find(feedbackIconDisplayName);
    expect(feedbackIcon).toHaveLength(0);
  });
});