import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Transactions")
export class Transactions {
  @PrimaryColumn()
  id: number;

  @Column({ type: "number" })
  value: number;

  @Column({ type: "timestamptz" })
  createdAt: Date;
}
