import React from 'react';
import { shallow } from 'enzyme';

import { Text } from 'react-native';
import Modal from './';

const modalDisplayName = 'Component';
const titleDisplayName = 'Styled(Text)';
const closeBtnDisplayName = 'Styled(Styled(Button))';

const visible = true;
const title = 'Modal title';
const onClose = jest.fn();
const children = <Text>Lorem ipsum</Text>;

const component = shallow(
  <Modal
    visible={visible}
    title={title}
    onClose={onClose}
  >
    {children}
  </Modal>
);

describe('<Modal />', () => {
  test('should render without errors', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  test('should set Modal visible prop', () => {
    const modal = component.find(modalDisplayName);
    expect(modal.prop('visible')).toBe(visible);
  });

  test('should set passed title', () => {
    const titleComponent = component.find(titleDisplayName);
    expect(titleComponent.text()).toBe(title);
  });

  test('press close button should call onClose callback', () => {
    const closeBtn = component.find(closeBtnDisplayName);

    closeBtn.simulate('press');
    expect(onClose).toHaveBeenCalled();
  });

  test('should render passed children', () => {
    const childrenComponent = component.children().get(1);
    expect(childrenComponent).toEqual(children);
  });
});