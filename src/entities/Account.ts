import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transactions } from "./Transaction";
import { User } from "./User";

@Entity("Accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  balance: string;

  @OneToOne(() => User, (user) => user.accountId)
  user: User;

  @OneToMany(() => Transactions, (transaction) => transaction.debitedAccountId)
  transaction_debit: Transactions;

  @OneToMany(() => Transactions, (transaction) => transaction.creditedAccountId)
  transaction_credit: Transactions;
}
