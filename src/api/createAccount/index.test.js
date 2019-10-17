import createAccount from './';

let calledEmail;
let calledPassword;

jest.mock('../firebase', () => ({
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn((email, password) => {
      calledEmail = email;
      calledPassword = password;
    })
  }))
}));

const email = 'sample@examle.com';
const password = '123qwe';

describe('createAccount', () => {
  afterAll(() => {
    jest.unmock('../firebase');
  });

  it('should pass email and password to Firebase function', () => {
    createAccount({ email, password });

    expect(calledEmail).toBe(email);
    expect(calledPassword).toBe(password);
  });
});