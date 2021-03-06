import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsModule } from './subjects/subjects.module';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    SubjectsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'academic_dashboard',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    TeachersModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
