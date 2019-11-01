module.exports = {
  useHistory: jest.fn(() => ({
    push: jest.fn(),
    goBack: jest.fn()
  }))
};