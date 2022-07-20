import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class TimestampEntites {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ name: 'created_by', type: "uuid", nullable: true })
    createdBy: string;

    @Column({ name: 'updated_by', type: "uuid", nullable: true })
    updatedBy: string;
}
