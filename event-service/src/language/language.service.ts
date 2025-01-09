import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Language, LanguageDocument } from './schema/language.schema';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const result = await this.languageModel.create(createLanguageDto);
    return result;
  }

  async findAll() {
    const result = await this.languageModel.find();
    return result;
  }

  async findOne(id: Types.ObjectId) {
    const result = await this.languageModel.findById(id);
    return result;
  }

  async update(id: Types.ObjectId, updateLanguageDto: UpdateLanguageDto) {
    const result = await this.languageModel.findByIdAndUpdate(
      id,
      updateLanguageDto,
      {
        new: true,
      },
    );
    return result;
  }

  async remove(id: Types.ObjectId) {
    const result = await this.languageModel.findByIdAndDelete(id);
    return result;
  }
}
