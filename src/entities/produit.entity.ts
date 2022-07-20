import { UserEntity } from "src/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthEntity } from "./Auth.entity";
import { TimestampEntites } from "./timetamp.entities";

@Entity()
export class ProduitEntity extends TimestampEntites{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    prodname: string;

    @Column()
    price: number

    @ManyToOne(
        type => UserEntity,
        (user) => user.produits,
        {
          cascade: true,
          nullable: true,
          eager: true
        }
      )
      users: UserEntity;
}