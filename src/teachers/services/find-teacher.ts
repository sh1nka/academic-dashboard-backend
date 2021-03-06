import { Injectable } from '@nestjs/common';
import { BAD_REQUEST } from 'src/shared/error-messages';
import { FindTeacherDtoByRG } from '../dto/find-teacher.dto';
import { TeachersRepository } from '../repository/teachers.repository';
import { Teacher } from '../teacher.entity';

@Injectable()
export class FindTeacherService {
  constructor(private teachersRepository: TeachersRepository) {}

  async findTeacher(findTeacherDtoByRG: FindTeacherDtoByRG): Promise<Teacher> {
    try {
      const found = await this.teachersRepository.findTeacherByRG(
        findTeacherDtoByRG.document_rg,
      );

      if (!found) {
        throw new Error('Professor não encontrado');
      }

      return found;
    } catch (error) {
      return BAD_REQUEST(error?.message);
    }
  }
}
