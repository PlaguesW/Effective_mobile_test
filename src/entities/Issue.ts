import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  topic: string;

  @Column()
  description: string;

  @Column({ type: 'varchar', default: 'new' })
  status: string;

  @Column({ nullable: true })
  resolutionText?: string;

  @Column({ nullable: true })
  cancellationReason?: string;

  @CreateDateColumn()
  createdAt: Date;
}