describe('LoginController', () => {
  beforeEach(module('moneyWeb'));
  describe('Login()', () => {

    it('Should make a login', inject($controller => {
      const LoginController = $controller('LoginController');
      LoginController.doLogin.should.equal(false);
    }))

    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1, 2, 3].indexOf(5));
    })

    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1, 2, 3].indexOf(0));
    })

  })
})