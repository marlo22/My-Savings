import login from './';

let setPersistenceCalled = false;
let signInWithEmailAndPasswordCalled = false;

jest.mock('firebase', () => {
  function auth() {
    return ({
      setPersistence: jest.fn(() => { setPersistenceCalled = true; }),
      signInWithEmailAndPassword: jest.fn(async (...params) => { signInWithEmailAndPasswordCalled = [...params]; }),
    });
  }

  auth.Auth = { Persistence: { NONE: 'NONE' } };

  return {
    initializeApp: jest.fn(),
    auth
  }
});

const email = 'sample@example.com';
const password = '123qwe';
const onSuccess = jest.fn();
const onError = jest.fn();

describe('login', () => {
  afterAll(() => {
    jest.unmock('firebase');
  });

  afterEach(() => {
    setPersistenceCalled = false;
    signInWithEmailAndPasswordCalled = false;
    onSuccess.mockClear();
    onError.mockClear();
  });

  it('if remember param is undefined should not call setPersistence', async done => {
    await login({ email, password, onSuccess, onError });
    expect(setPersistenceCalled).toBe(false);
    done();
  });

  it('if remember param is set to false should not call setPersistence', async done => {
    await login({ email, password, remember: false, onSuccess, onError });
    expect(setPersistenceCalled).toBe(true);
    done();
  });

  it('if remember param is set to true should call setPersistence', async done => {
    await login({ email, password, remember: true, onSuccess, onError });
    expect(setPersistenceCalled).toBe(false);
    done();
  });

  it('should call signInWithEmailAndPassword', async done => {
    await login({ email, password, onSuccess, onError });
    expect(signInWithEmailAndPasswordCalled).toEqual([email, password]);
    done();
  });

  it('should call onSuccess when not throw error', async done => {
    await login({ email, password, onSuccess, onError });
    expect(onSuccess).toHaveBeenCalled();
    done();
  });

  it('should call onError when not throw error', async done => {
    await login({ email: '', password, onSuccess, onError });
    expect(onError).toHaveBeenCalled();
    done();
  });
});