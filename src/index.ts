import { BookService } from './services/BookService';

async function main() {
    const books = await BookService.fetchBookDetails('OL45804W');
    console.log(books);
}

main();

