import { AuthorsServices } from '../../services/AuthorsServices';
import { Authors } from '../../entities/Authors';

describe('AuthorsServices Integration Test', () => {
    it('should fetch authors based on query', async () => {
        const authors: Authors[] = await new AuthorsServices().fetchAuthors('rowling');
        expect(authors.length).toBeGreaterThan(0);
        expect(authors[0]).toBeInstanceOf(Authors);
    });

    it('should fetch authors with pagination', async () => {
        const authors: Authors[] = await new AuthorsServices().fetchAuthors('rowling', 2, 5);
        expect(authors.length).toBe(5);
    });

    it('should fetch authors sorted by name', async () => {
        const authors: Authors[] = await new AuthorsServices().fetchAuthors('rowling', 1, 10, 'name');
        expect(authors.length).toBeGreaterThan(0);
        expect(authors).toEqual(authors.sort((a, b) => a.name.localeCompare(b.name)));
    });

    it('should fetch authors sorted by birth date', async () => {
        const authors: Authors[] = await new AuthorsServices().fetchAuthors('rowling', 1, 10, 'birth_date');
        expect(authors.length).toBeGreaterThan(0);
        expect(authors).toEqual(authors.sort((a, b) => (a.birthDate || '').localeCompare(b.birthDate || '')));
    });

    it('should fetch author details', async () => {
        const author: Authors | null = await new AuthorsServices().fetchAuthorDetail('OL23919A');
        expect(author).not.toBeNull();
        expect(author).toBeInstanceOf(Authors);
    });
});
