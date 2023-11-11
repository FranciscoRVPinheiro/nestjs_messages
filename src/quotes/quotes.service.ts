import { QuotesRepository} from "./quotes.repository"

export class QuotesService {
    messagesRepo: QuotesRepository

    constructor() {
        // DONT DO IT IN REAL APPS
        this.messagesRepo = new QuotesRepository()
    }

    findOne(id: string) {
        return this.messagesRepo.findOne(id)
    }  

    findAll() {
        return this.messagesRepo.findAll()

    }

    create(author: string, quote: string) {
        return this.messagesRepo.create(author, quote)
    }

    findByAuthor(author: string) {
        return this.messagesRepo.findByAuthor(author)
    }
}