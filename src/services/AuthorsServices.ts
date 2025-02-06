import axiosInstance from '../utils/axiosInstance';
import { Authors } from '../entities/Authors';

/**
 * Service for fetching author data from an external API.
 */
export class AuthorsServices {
    /**
     * Fetches authors based on the search query with paging and sorting.
     * 
     * @param query - The search query string.
     * @param page - The page number to fetch.
     * @param limit - The number of results per page.
     * @param sortBy - The field to sort by ('name' or 'birth_date').
     * @returns A promise that resolves to an array of Authors objects.
     */
    async fetchAuthors(query: string, page: number = 1, limit: number = 10, 
        sortBy?: 'name' | 'birth_date' ): Promise<Authors[]> {

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
        let authors = data.docs.map((author: any) => Authors.fromJson(author));
                
        return authors;
    }

    /**
     * Fetches detailed author data based on the author key.
     * 
     * @param key - The key of the author.
     * @returns A promise that resolves to an Authors object.
     */
    async fetchAuthorDetail(key: string): Promise<Authors | null> {
        try {
            const response = await axiosInstance.get(`/authors/${key}.json`);
            return Authors.fromDetailsJson(response.data);
        } catch (error) {
            return null;
        }
    }
}
