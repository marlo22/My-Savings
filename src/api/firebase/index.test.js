require('./');

import firebase from 'firebase';
import { firebaseConfig } from '../../config/';

jest.mock('firebase', () => ({
  initializeApp: jest.fn()
}));

describe('firebase', () => {
  afterAll(() => {
    jest.unmock('firebase');
  });

  it('should call firebase.initializeApp with passed config', () => {
    expect(firebase.initializeApp).toHaveBeenCalledWith(firebaseConfig)
  });
});