import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  roleId: number

  @Column()
  departementId: number

  @Column({
    unique: true
  })
  nik: string

  @Column()
  name: string

  @Column()
  country: string

  @Column({
    nullable: true
  })
  picture: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}