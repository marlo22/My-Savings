import checkAuth from './';
import firebase from 'firebase';

jest.mock('firebase', () => ({
  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(cb => cb({ user: 'admin' }))
  }))
}));

const onSuccess = jest.fn();
const onFailed = jest.fn();
const afterCheck = jest.fn();

describe('checkAuth', () => {
  afterEach(() => {
    onSuccess.mockClear();
    onFailed.mockClear();
    afterCheck.mockClear();
  });

  afterAll(() => {
    jest.unmock('firebase');
  });

  test('if afterCheck callback is passed should call it', () => {
    checkAuth({ afterCheck });
    expect(afterCheck).toHaveBeenCalled();
  });

  test('on auth change success should call onSuccess callback', () => {
    checkAuth({ onSuccess, onFailed, afterCheck });

    setTimeout(() => {
      expect(onSuccess).toHaveBeenCalled();
      expect(onFailed).not.toHaveBeenCalled();
      expect(afterCheck).toHaveBeenCalled();
    });
  });

  test('on auth change failed should call onFailed callback', () => {
    firebase.auth.mockImplementation(() => ({
      onAuthStateChanged: jest.fn(cb => cb())
    }));

    checkAuth({ onSuccess, onFailed, afterCheck });

    setTimeout(() => {
      expect(onSuccess).not.toHaveBeenCalled();
      expect(onFailed).toHaveBeenCalled();
      expect(afterCheck).toHaveBeenCalled();
    });
  });
});