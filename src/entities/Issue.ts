import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  topic!: string;

  @Column()
  description!: string;

  @Column()
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;
}