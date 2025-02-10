/**
 * Represents an author with various attributes.
 */
export class Author {
    id: string;
    name: string;
    birthDate?: string;
    deathDate?: string;
    title: string;
    alternateNames: string[];
    topSubjects: string[];
    topWork: string;
    workCount: number;
    bio?: string;
    links?: { title: string, url: string }[];
    photos: number[];
    photosUrl: string[];
    remoteIds?: { [key: string]: string };
    created?: string;

    /**
     * Constructs a new Authors instance.
     * @param id - The unique identifier for the author.
     * @param name - The name of the author.
     * @param title - The title of the author's top work.
     * @param birthDate - The birth date of the author.
     * @param deathDate - The death date of the author.
     * @param alternateNames - An array of alternate names for the author.
     * @param topSubjects - An array of top subjects associated with the author.
     * @param topWork - The title of the author's top work.
     * @param workCount - The number of works by the author.
     * @param bio - The biography of the author.
     * @param links - An array of links related to the author.
     * @param photos - An array of photo IDs related to the author.
     * @param remoteIds - An object containing remote IDs for the author.
     * @param created - The creation date of the author record.
     */
    constructor(id: string, name: string, title: string, birthDate?: string, deathDate?: string, alternateNames: string[] = [], topSubjects: string[] = [], topWork: string = '', workCount: number = 0, bio?: string, links?: { title: string, url: string }[], photos?: number[], remoteIds?: { [key: string]: string }, created?: string) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.title = title;
        this.alternateNames = alternateNames;
        this.topSubjects = topSubjects;
        this.topWork = topWork;
        this.workCount = workCount;
        this.bio = bio;
        this.links = links;
        this.photos = photos || [];
        this.remoteIds = remoteIds;
        this.created = created;

        this.photosUrl = [];
    }

    /**
     * Creates an Authors instance from a JSON object.
     * @param json - The JSON object containing author data.
     * @returns A new Authors instance.
     */
    static fromJson(json: any): Author {
        return new Author(
            json.key,
            json.name,
            json.top_work,
            json.birth_date,
            json.death_date,
            json.alternate_names || [],
            json.top_subjects || [],
            json.top_work || '',
            json.work_count || 0
        );
    }

    /**
     * Creates an Authors instance from a detailed JSON object.
     * @param json - The JSON object containing detailed author data.
     * @returns A new Authors instance.
     */
    static fromDetailsJson(json: any): Author {
        const author = new Author(
            json.key.split('/').pop(),
            json.name,
            json.title,
            json.birth_date,
            json.death_date,
            json.alternate_names || [],
            json.top_subjects || [],
            json.top_work || '',
            json.work_count || 0,
            json.bio,
            json.links,
            json.photos,
            json.remote_ids,
            json.created?.value
        );
        return author;
    }
}
