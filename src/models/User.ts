import { Entity, BaseEntity, PrimaryGeneratedColumn, Column ,OneToMany} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import {Book} from './Book';


@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => [Book])
  @OneToMany(()=>Book,(book)=>book.orderBy)
  books:Book[]

}
