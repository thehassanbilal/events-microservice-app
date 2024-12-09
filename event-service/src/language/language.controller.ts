import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Types } from 'mongoose';

@Controller()
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @MessagePattern('createLanguage')
  create(@Payload() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @MessagePattern('findAllLanguage')
  findAll() {
    return this.languageService.findAll();
  }

  @MessagePattern('findOneLanguage')
  findOne(@Payload() id: Types.ObjectId) {
    return this.languageService.findOne(id);
  }

  @MessagePattern('updateLanguage')
  update(@Payload() updateLanguageDto: UpdateLanguageDto) {
    return this.languageService.update(updateLanguageDto.id, updateLanguageDto);
  }

  @MessagePattern('removeLanguage')
  remove(@Payload() id: Types.ObjectId) {
    return this.languageService.remove(id);
  }
}
