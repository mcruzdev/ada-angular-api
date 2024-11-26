import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'todos',
  timestamps: false,
})
export class ToDo extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: false,
  })
  id: string;

  @Column
  title: string;

  @Column
  completed: boolean;
}
