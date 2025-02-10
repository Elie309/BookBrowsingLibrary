import axiosInstance from '../utils/axiosInstance';
import { Author } from '../entities/Author';

/**
 * Service for fetching author data from an external API.
 */
export class AuthorServices {
    /**
     * Fetches authors based on the search query with paging and sorting.
     * 
     * @param query - The search query string.
     * @param page - The page number to fetch.
     * @param limit - The number of results per page.
     * @param sortBy - The field to sort by ('name' or 'birth_date').
     * @returns A promise that resolves to an array of Authors objects.
     */
    static async fetchAuthors(query: string, page: number = 1, limit: number = 10, 
        sortBy?: 'name' | 'birth_date' ): Promise<Author[]> {

        const offset = (page - 1) * limit;
        const response = await axiosInstance.get(`/search/authors.json`, {
            params: {
                q: query,
                offset: offset,
                limit: limit,
                sorts: sortBy || ''
            }
        });
        const data = response.data;
        let authors = data.docs.map((author: any) => {
            let authorObj = Author.fromJson(author);
            authorObj.photosUrl.push(`https://covers.openlibrary.org/a/olid/${author.key}-L.jpg`);
            return authorObj;
        });
        return authors;
    }

    /**
     * Fetches detailed author data based on the author key.
     * 
     * @param key - The key of the author.
     * @returns A promise that resolves to an Authors object.
     */
    static async fetchAuthorDetail(key: string): Promise<Author | null> {
        try {
            const response = await axiosInstance.get(`/authors/${key}.json`);
            let author = Author.fromDetailsJson(response.data);
            if (response.data.photos && response.data.photos.length > 0 && response.data.photos[0] !== -1) {
                author.photosUrl.push(`https://covers.openlibrary.org/b/id/${response.data.photos[0]}-L.jpg`);
            }
            return author;
        } catch (error) {
            return null;
        }
    }
}
