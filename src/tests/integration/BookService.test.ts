import { BookService } from '../../services/BookService';
import { Book } from '../../entities/Book';

describe('BookService Integration Test', () => {
    it('should fetch books based on query', async () => {
        const books: Book[] = await BookService.fetchBooks('harry potter');
        expect(books.length).toBeGreaterThan(0);
        expect(books[0]).toBeInstanceOf(Book);
    });

    it('should fetch books with pagination', async () => {
        const books: Book[] = await BookService.fetchBooks('harry potter', 2, 5);
        expect(books.length).toBe(5);
    });

    it('should fetch books sorted by title', async () => {
        const books: Book[] = await BookService.fetchBooks('harry potter', 1, 10, 'title');
        expect(books.length).toBeGreaterThan(0);
        expect(books).toEqual(books.sort((a, b) => a.title.localeCompare(b.title)));
    });

    it('should fetch books sorted by publish year', async () => {
        const books: Book[] = await BookService.fetchBooks('harry potter', 1, 10, 'new');
        expect(books.length).toBeGreaterThan(0);
        expect(books).toEqual(books.sort((a, b) => (a.publishYear || 0) - (b.publishYear || 0)));
    });

    it('should fetch book details', async () => {
        const book: Book | null = await BookService.fetchBookDetails('OL45804W');
        expect(book).not.toBeNull();
        expect(book).toBeInstanceOf(Book);
    });
});
