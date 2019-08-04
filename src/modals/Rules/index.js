import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../../components';
import { Text } from 'react-native';

const RulesModal = ({ visible, onClose }) => (
  <Modal
    title="Regulamin"
    visible={visible}
    onClose={onClose}
  >
    <Text style={{ color: 'black' }}>Treść regulaminu...</Text>
  </Modal>
);

RulesModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default RulesModal;