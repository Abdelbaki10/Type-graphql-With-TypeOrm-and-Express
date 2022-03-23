import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Book } from "../models/Book";
import { CreateBookInput } from "../inputs/CreateBookInput";
import { UpdateBookInput } from "../inputs/UpdateBookInput";
import{User} from'../models/User';
@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books() {
    return await Book.find();
  }

  @Query(() => Book)
  async book(@Arg("id") id: string) {
    const book =  await Book.findOne({ where: { id } });
    console.log('this is the book ',book?.orderBy)
    return book
  }

  @Mutation(() => Book)
  async createBook(@Arg("data") data: CreateBookInput):Promise<Book|string> {
    const {title,author,orderById} = data
    const user = await User.findOne({id:orderById}) 
    if(user){
      const book = new Book()
      book.title = title
      book.author = author
      book.orderBy = user 
      book.isPublished = true
      await book.save()
      return book
    }
    else return "we can not order a book without the user informations"
  }

  @Mutation(() => Book)
  async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error("Book not found!");
    Object.assign(book, data);
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("id") id: string) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error("Book not found!");
    await book.remove();
    return true;
  }
}
