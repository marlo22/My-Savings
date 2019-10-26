import { Linking } from 'react-native';

import { getVersion } from 'react-native-device-info';
import { repositoryPackageJson, androidBuildUrl } from '../../config';

import { Toast } from 'native-base';

import { primaryColor } from '../../themes';

const currentVersion = getVersion();

export default function checkUpdate() {
  fetch(repositoryPackageJson)
    .then(res => res.json())
    .then(({ version: repositoryVersion }) => {
      if (repositoryVersion > currentVersion) {
        Toast.show({
          type: 'warning',
          text: 'Aktualizacja dostępna.',
          buttonText: 'Pobierz',
          buttonStyle: { backgroundColor: primaryColor },
          onClose: () => Linking.openURL(androidBuildUrl),
          duration: 0
        });
      }
    });
}