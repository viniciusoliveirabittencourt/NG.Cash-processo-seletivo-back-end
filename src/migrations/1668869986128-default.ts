import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668869986128 implements MigrationInterface {
    name = 'default1668869986128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Accounts" DROP CONSTRAINT "FK_de9be41bbb22c6c4fed284f8064"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP CONSTRAINT "FK_592199c0dfed3dd8c9e6a72c90c"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP COLUMN "transactionDebitId"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP COLUMN "transactionCreditId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Accounts" ADD "transactionCreditId" integer`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD "transactionDebitId" integer`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD CONSTRAINT "FK_592199c0dfed3dd8c9e6a72c90c" FOREIGN KEY ("transactionCreditId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD CONSTRAINT "FK_de9be41bbb22c6c4fed284f8064" FOREIGN KEY ("transactionDebitId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
