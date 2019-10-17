import resetPassword from './';

let sendPasswordResetEmailCalled = false;

jest.mock('firebase', () => ({
  auth: jest.fn(() => ({
    sendPasswordResetEmail: jest.fn((...params) => { sendPasswordResetEmailCalled = [...params] })
  }))
}));

const email = 'sample@example.com';

describe('resetPassword', () => {
  afterAll(() => {
    jest.unmock('firebase');
  });

  it('should call sendPasswordResetEmail Firebase method with email', () => {
    resetPassword({ email });
    expect(sendPasswordResetEmailCalled).toEqual([email]);
  });
});