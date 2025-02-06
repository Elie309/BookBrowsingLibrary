import {AuthorServices} from '../../services/AuthorServices';
import axiosInstance from '../../utils/axiosInstance';
import {Author} from '../../entities/Author';

jest.mock('../../utils/axiosInstance');

describe('AuthorsServices', () => {
    it('should fetch authors with default paging', async () => {
        const mockResponse = {
            data: {
                docs: [
                    { key: '1', name: 'Author 1', birth_date: '1970-01-01', top_work: 'Work 1' },
                    { key: '2', name: 'Author 2', birth_date: '1980-01-01', top_work: 'Work 2' }
                ]
            }
        };
        (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

        const authors = await new AuthorServices().fetchAuthors('test');
        expect(authors).toEqual([
            Author.fromJson(mockResponse.data.docs[0]),
            Author.fromJson(mockResponse.data.docs[1])
        ]);
    });

    it('should fetch authors with specified paging', async () => {
        const mockResponse = {
            data: {
                docs: [
                    { key: '3', name: 'Author 3', birth_date: '1990-01-01', top_work: 'Work 3' }
                ]
            }
        };
        (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

        const authors = await new AuthorServices().fetchAuthors('test', 2, 1);
        expect(authors).toEqual([
            Author.fromJson(mockResponse.data.docs[0])
        ]);
    });

    it('should fetch author details', async () => {
        const mockResponse = {
            data: {
                key: '/authors/OL23919A',
                name: 'J. K. Rowling',
                title: 'OBE',
                birth_date: '31 July 1965',
                alternate_names: ['Joanne Rowling', 'Robert Galbraith'],
                bio: 'Joanne "Jo" Murray, OBE (née Rowling), better known under the pen name J. K. Rowling...',
                links: [{ title: 'Official Site', url: 'http://www.jkrowling.com/' }],
                photos: [5543033, -1],
                created: { type: '/type/datetime', value: '2008-04-01T03:28:50.625462' }
            }
        };
        (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

        const author = await new AuthorServices().fetchAuthorDetail('OL23919A');
        expect(author).toEqual(Author.fromDetailsJson(mockResponse.data));
    });
});
