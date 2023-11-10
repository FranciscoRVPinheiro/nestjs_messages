import { MessagesRepository} from "./messages.repository"

export class MessagesService {
    messagesRepo: MessagesRepository

    constructor() {
        // DONT DO IT IN REAL APPS
        this.messagesRepo = new MessagesRepository()
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
}