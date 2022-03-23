import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field(()=>String)
  id:string
  
  @Field(()=>String)
  username: string;
}
