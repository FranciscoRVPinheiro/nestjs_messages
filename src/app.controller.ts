import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/messages')
  getMessages(): string {
    return this.appService.getMessages();
  }
}
