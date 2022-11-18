import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Account } from "./Account";

@Entity("Transactions")
export class Transactions {
  @PrimaryColumn()
  id: number;

  @Column({ type: "number" })
  value: number;

  @Column({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.transaction_debit)
  @JoinColumn({ name: "debitedAccountId" })
  debitedAccountId: Account;

  @ManyToOne(() => Account, (account) => account.transaction_credit)
  @JoinColumn({ name: "creditedAccountId" })
  creditedAccountId: Account;
}
