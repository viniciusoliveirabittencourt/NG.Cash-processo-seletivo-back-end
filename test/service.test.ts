import sinon from "sinon";
import chai from "chai";
import serviceClass from "../src/service/serviceClass";

const expect = chai.expect;

describe("Test service class", () => {
  describe("Testando a função errorConsole", () => {
    it("Testando se passando um erro como parametro, a função retorna o console do erro e a mensagem 'Internal error!'", () => {
      const spy = sinon.spy(console, "error")
      const myService = new serviceClass();
      const error = new Error();

      // @ts-ignore
      myService.errorConsole(error);

      expect(spy.calledWith("Internal error!\n" + error)).to.be.true

      spy.restore()
    });
  });
});
