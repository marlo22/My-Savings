import logout from './';

jest.mock('../firebase', () => ({
  auth: jest.fn(() => ({
    signOut: jest.fn()
  }))
}));

const push = jest.fn();

describe('logout', () => {
  afterAll(() => {
    jest.unmock('../firebase');
  });

  it('should call push function if passed', async done => {
    await logout({ push });
    expect(push).toHaveBeenCalledWith('/');
    done();
  });

  it('should not throw error if push function is not defined', done => {
    expect(async () => await push()).not.toThrow();
    done();
  });
});