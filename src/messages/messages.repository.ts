import { readFile, writeFile } from "fs/promises";

export class MessagesRepository {

    async findOne(id: string) {
        const contents = await readFile('quotes.json', 'utf8')
        const messages = JSON.parse(contents)

        return messages[id]
    }

    async findByAuthor(author: string) {
        const contents = await readFile('quotes.json', 'utf8')
        const messages = JSON.parse(contents)

        let authorArray = []

        for ( let key in messages) {
            if (messages[key].author.toLowerCase() === author.toLowerCase()) {
                authorArray.push(messages[key])
            }
        }

        return authorArray
    }

    async findAll() {
        const contents = await readFile('quotes.json', 'utf8')
        const messages = JSON.parse(contents)

        return messages

    }
    
    async create(author: string, quote: string) {
        const contents = await readFile('quotes.json', 'utf8')
        const messages = JSON.parse(contents)
        
        const id = Math.floor(Math.random() * 53)
        
        messages[id] = { id, author, quote }

        await writeFile('quotes.json', JSON.stringify(messages))
    }

} 