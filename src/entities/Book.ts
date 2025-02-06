/**
 * Represents a book with various attributes.
 */
export default class Book {
    id: string;
    title: string;
    cover: string;
    authors: string[];
    publishYear?: number;
    editionCount: number;
    firstPublishYear: number;
    authorKey: string[];
    publicScan: boolean;
    description?: string;
    covers?: number[];
    subject_places?: string[];
    subjects?: string[];
    subject_people?: string[];
    subject_times?: string[];
    location?: string;
    created?: string;

    /**
     * Constructs a new Book instance.
     * @param id - The unique identifier for the book.
     * @param title - The title of the book.
     * @param cover - The URL of the book's cover image.
     * @param authors - An array of author names.
     * @param editionCount - The number of editions of the book.
     * @param firstPublishYear - The year the book was first published.
     * @param authorKey - An array of author keys.
     * @param publicScan - Indicates if the book is publicly scanned.
     * @param publishYear - The year the book was published.
     */
    constructor(id: string, title: string, cover: string, authors: string[], editionCount: number = 0, 
        firstPublishYear: number = 0, authorKey: string[] = [], publicScan: boolean = false, publishYear?: number) {
        this.id = id;
        this.title = title;
        this.cover = cover;
        this.authors = authors;
        this.publishYear = publishYear;
        this.editionCount = editionCount;
        this.firstPublishYear = firstPublishYear;
        this.authorKey = authorKey;
        this.publicScan = publicScan;
    }

    /**
     * Creates a Book instance from a JSON object returned by the search API.
     * @param json - The JSON object containing book data from search results.
     * @returns A new Book instance.
     */
    static fromSearchJson(json: any): Book {
        return new Book(
            json.key,
            json.title,
            json.cover_i ? `https://covers.openlibrary.org/b/id/${json.cover_i}-L.jpg` : '',
            json.author_name || [],
            json.edition_count || 0,
            json.first_publish_year || 0,
            json.author_key || [],
            json.public_scan_b || false
        );
    }

    /**
     * Creates a Book instance from a JSON object returned by the book details API.
     * @param json - The JSON object containing detailed book data.
     * @returns A new Book instance.
     */
    static fromDetailsJson(json: any): Book {
        const book = new Book(
            json.key.split('/').pop(),
            json.title,
            '', // Cover URL is not provided in the detailed book data
            [],// Author names are not provided in the detailed book data
            0, // Edition count is not provided in the detailed book data
            0, // First publish year is not provided in the detailed book data
            json.authors.map((author: any) => author.author.key.split('/').pop()), 
            false // Public scan is not provided in the detailed book data
        );
        book.description = json.description;
        book.covers = json.covers;
        book.subject_places = json.subject_places;
        book.subjects = json.subjects;
        book.subject_people = json.subject_people;
        book.subject_times = json.subject_times;
        book.location = json.location;
        book.created = json.created?.value;
        return book;
    }
}
