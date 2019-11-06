import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-54-235-100-99.compute-1.amazonaws.com',
      port: 5432,
      username: 'ubbrcordtehxzk',
      password: 'fecf28d6e0c623fdc292e7649d62421f81ecdc85ec5a2b3f0dc78ef97f68c096',
      database: 'd87ba8lud7dn48',
      entities: [
        '**/*.entity.ts'
      ],
      synchronize: true,
      ssl: true
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
