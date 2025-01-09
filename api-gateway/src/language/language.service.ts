import { Inject, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationDto } from 'src/global/paginated.dto';

@Injectable()
export class LanguageService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventProxyClient: ClientKafka,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    return await this.eventProxyClient.send(
      'createLanguage',
      createLanguageDto,
    );
  }

  async findAll() {
    return await this.eventProxyClient.send('findAllLanguage', {});
  }

  async getPaginatedAndFilteredLanguages(paginationDto: PaginationDto) {
    return await this.eventProxyClient.send('paginateLanguage', paginationDto);
  }

  async findOne(id: number) {
    return await this.eventProxyClient.send('findOneLanguage', { id });
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return await this.eventProxyClient.send('updateLanguage', {
      id,
      ...updateLanguageDto,
    });
  }

  async remove(id: number) {
    return await this.eventProxyClient.send('deleteLanguage', { id });
  }
}
