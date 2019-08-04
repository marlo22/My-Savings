import React from 'react';

import { Icon } from 'native-base';

export default function renderInputIcon(status) {
  if (status) {
    return <Icon name="checkmark-circle" />;
  }

  if (status === false) {
    return <Icon name="close-circle" />
  }

  return null;
};