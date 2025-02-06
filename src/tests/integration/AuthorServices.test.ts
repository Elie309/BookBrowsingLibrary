import {AuthorServices} from '../../services/AuthorServices';
import  {Author}  from '../../entities/Author';

describe('AuthorsServices Integration Test', () => {
    it('should fetch authors based on query', async () => {
        const authors: Author[] = await new AuthorServices().fetchAuthors('rowling');
        expect(authors.length).toBeGreaterThan(0);
        expect(authors[0]).toBeInstanceOf(Author);
    });

    it('should fetch authors with pagination', async () => {
        const authors: Author[] = await new AuthorServices().fetchAuthors('rowling', 2, 5);
        expect(authors.length).toBe(5);
    });

    it('should fetch authors sorted by name', async () => {
        const authors: Author[] = await new AuthorServices().fetchAuthors('rowling', 1, 10, 'name');
        expect(authors.length).toBeGreaterThan(0);
        expect(authors).toEqual(authors.sort((a, b) => a.name.localeCompare(b.name)));
    });

    it('should fetch authors sorted by birth date', async () => {
        const authors: Author[] = await new AuthorServices().fetchAuthors('rowling', 1, 10, 'birth_date');
        expect(authors.length).toBeGreaterThan(0);
        expect(authors).toEqual(authors.sort((a, b) => (a.birthDate || '').localeCompare(b.birthDate || '')));
    });

    it('should fetch author details', async () => {
        const author: Author | null = await new AuthorServices().fetchAuthorDetail('OL23919A');
        expect(author).not.toBeNull();
        expect(author).toBeInstanceOf(Author);
    });
});
