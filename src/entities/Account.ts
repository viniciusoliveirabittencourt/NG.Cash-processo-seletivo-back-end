import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("Accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  balance: string;

  @OneToOne(() => User, (user) => user.accountId)
  user: User;
}
