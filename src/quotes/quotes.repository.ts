import { readFile, writeFile } from "fs/promises";

export class QuotesRepository {
    file: string;
    
    constructor() {
        this.file = 'src/database/quotes.json';
    } 

    async findOne(id: string) {
        const contents = await readFile(this.file, 'utf8');
        const quotes = JSON.parse(contents)

        return quotes[id]
    }

    async findByAuthor(author: string) {
        const contents = await readFile(this.file, 'utf8')
        const quotes = JSON.parse(contents)

        let authorArray = []

        for ( let key in quotes) {
            if (quotes[key].author.toLowerCase() === author.toLowerCase()) {
                authorArray.push(quotes[key])
            }
        }

        return authorArray
    }

    async findAll() {
        const contents = await readFile(this.file, 'utf8')
        const quotes = JSON.parse(contents)

        return quotes
    }
    
    async create(author: string, quote: string) {
        const contents = await readFile(this.file, 'utf8')
        const quotes = JSON.parse(contents)
        
        const id = Math.floor(Math.random() * 53)
        
        quotes[id] = { id, author, quote }

        await writeFile(this.file, JSON.stringify(quotes))
    }

} 