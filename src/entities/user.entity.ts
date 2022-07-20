import { ProduitEntity } from "../entities/produit.entity";
import { UserRoleEnum } from "../users/enums/user-role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntites } from "./timetamp.entities";

@Entity()
export class UserEntity extends TimestampEntites {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      length: 50,
      unique: true
    })
    public username: string;

    @Column()
    public password: string

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string

    @Column({unique: true})
    public email:string

    @OneToMany(
        type => ProduitEntity,
        (produit) => produit.users,
        {
          nullable: true,
          cascade: false
        }
      )
      produits: ProduitEntity[];
    
}