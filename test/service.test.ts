import "reflect-metadata";
import sinon from "sinon";
import chai from "chai";
import serviceClass from "../src/service/serviceClass";
import accountRepository from "../src/repositories/accountRepository";

const expect = chai.expect;

describe("Test service class", () => {
  describe("Testando a função errorConsole", () => {
    it("Testando se passando um erro como parametro, a função retorna o console do erro e a mensagem 'Internal error!'", () => {
      const spy = sinon.spy(console, "error");
      const myService = new serviceClass();
      const error = new Error();

      // @ts-ignore
      myService.errorConsole(error);

      expect(spy.calledWith("Internal error!\n" + error)).to.be.true;

      spy.restore();
    });
  });

  describe("Testando a função createAccount", () => {
    it("Testando se caso a função seja chamada e ocorra tudo bem com banco de dados, a função retorna um Account", async () => {
      const myService = new serviceClass();
      const createAccount = accountRepository.create({ balance: 100 });
      const saveStub = sinon
        .stub(accountRepository, "save")
        .resolves(createAccount);

      // @ts-ignore
      const returnService = await myService.createAccount();

      expect(returnService).to.be.equal(createAccount);

      saveStub.restore();
    });
  });
});
