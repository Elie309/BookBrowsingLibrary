import axiosInstance from '../utils/axiosInstance';
import { Book } from '../entities/Book';

/**
 * Service for fetching book data from an external API.
 */
export class BookService {

    /**
     * Fetches books based on the search query, page number, limit, and optional sorting.
     * 
     * @param query - The search query string.
     * @param page - The page number for pagination (default is 1).
     * @param limit - The number of results per page (default is 10).
     * @param sortBy - Optional sorting parameter ('title' or 'publish_year').
     * @returns A promise that resolves to an array of Book objects.
     */
    static async fetchBooks(query: string, page: number = 1, limit: number = 10, sortBy?: 'title' | 'new' | 'old'): Promise<Book[]> {
        try {
            //?q=${query}&page=${page}&limit=${limit}${sortParam}
            const response = await axiosInstance.get('/search.json', {
                params: {
                    q: query,
                    page: page,
                    limit: limit,
                    sorts: sortBy || ''
                }
            });
            return response.data.docs.map((doc: any) => Book.fromSearchJson(doc));
        } catch (error) {
            return [];
        }
    }

    /**
     * Fetches book details based on the book key.
     * 
     * @param key - The key of the book.
     * @returns A promise that resolves to a Book object.
     */
    static async fetchBookDetails(key: string): Promise<Book | null> {
        try {
            const response = await axiosInstance.get(`/works/${key}.json`);
            return Book.fromDetailsJson(response.data);
        } catch (error) {
            return null;
        }
    }

}
