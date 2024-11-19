import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'events',
  timestamps: false,
})
export class Event extends Model {
  @Column
  name: string;

  @Column
  price: number;

  @Column({
    field: 'capacity_limit',
  })
  capacityLimit: number;
}
