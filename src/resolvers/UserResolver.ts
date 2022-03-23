import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { UpdateUserInput } from "../inputs/updateUser";
import { User } from "../models/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Query(() => User)
  async user(@Arg("id") id: string) {
    return await User.findOne({ where: { id } });
  }

  @Mutation(()=> User)
  async createUser(@Arg("username") username:string):Promise<User|string>{
    const user =  User.create({username})
    const result = await User.save(user)
    return result
  }

  @Mutation(()=> User)
  async updateUser(@Arg("data") data:UpdateUserInput):Promise<User|string>{
      const {id,username} = data
        const targetUser = await User.findOne({id})
        if(targetUser){
            targetUser.username = username
            return await targetUser.save()
        }else{
            return "user Not found"
        }
    }

    @Mutation(()=>[User])
    async deleteUser(@Arg("id")id:string):Promise<User[]|string>{
        const targetUser = await User.findOne({id})
        if(targetUser){
            await User.delete({id})
            return await User.find()
        }else{
            return "user Not found"
        }
    }

}
