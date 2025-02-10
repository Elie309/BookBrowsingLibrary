import {BookService} from '../../services/BookService';
import axiosInstance from '../../utils/axiosInstance';
import {Book} from '../../entities/Book';

jest.mock('../../utils/axiosInstance');

describe('BookService', () => {
    it('should fetch books with default paging', async () => {
        const mockResponse = {
            data: {
                docs: [
                    { key: '1', title: 'Book 1', cover_i: 123, author_name: ['Author 1'] },
                    { key: '2', title: 'Book 2', cover_i: 456, author_name: ['Author 2'] }
                ]
            }
        };
        (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

        const books = await BookService.fetchBooks('test');
        expect(books).toEqual([
            Book.fromSearchJson(mockResponse.data.docs[0]),
            Book.fromSearchJson(mockResponse.data.docs[1])
        ]);
    });

    it('should fetch books with specified paging', async () => {
        const mockResponse = {
            data: {
                docs: [
                    { key: '3', title: 'Book 3', cover_i: 789, author_name: ['Author 3'] }
                ]
            }
        };
        (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

        const books = await BookService.fetchBooks('test', 2, 1);
        expect(books).toEqual([
            Book.fromSearchJson(mockResponse.data.docs[0])
        ]);
    });

    it('should fetch book details', async () => {
        const mockResponse = {
            data: {
                key: 'OL45804W',
                title: 'Fantastic Mr Fox',
                authors: [{ author: { key: '/authors/OL34184A' } }],
                description: 'The main character of Fantastic Mr. Fox is an extremely...',
                covers: [6498519, 8904777],
                subject_places: ['English countryside'],
                subjects: ['Animals', 'Hunger'],
                subject_people: ['Mr Fox'],
                subject_times: ['20th Century'],
                location: '/works/OL45883W',
                created: { type: '/type/datetime', value: '2009-10-15T11:34:21.437031' }
            }
        };
        const mockAuthorResponse = {
            data: {
                name: 'Roald Dahl'
            }
        };
        (axiosInstance.get as jest.Mock)
            .mockResolvedValueOnce(mockResponse)
            .mockResolvedValueOnce(mockAuthorResponse);

        const book = await BookService.fetchBookDetails('OL45804W');
        expect(book).toEqual({
            ...Book.fromDetailsJson(mockResponse.data),
            authors: ['Roald Dahl'],
            cover: 'https://covers.openlibrary.org/b/id/6498519-L.jpg'
        });
    });
});
