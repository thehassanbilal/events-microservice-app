import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Types } from 'mongoose';

@Injectable()
export class LanguageService {
  create(createLanguageDto: CreateLanguageDto) {
    console.log('here is data createLanguageDto', createLanguageDto);
    return 'This action adds a new language';
  }

  findAll() {
    return `This action returns all language`;
  }

  findOne(id: Types.ObjectId) {
    return `This action returns a #${id} language`;
  }

  update(id: Types.ObjectId, updateLanguageDto: UpdateLanguageDto) {
    console.log('here is data updateLanguageDto', updateLanguageDto);
    return `This action updates a #${id} language`;
  }

  remove(id: Types.ObjectId) {
    return `This action removes a #${id} language`;
  }
}
