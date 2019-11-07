import { Controller, Body, Query, Post, Get, UseInterceptors, UploadedFile, Param, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import * as cloudinary from 'cloudinary';
import * as config from 'config';
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from 'path';

@Controller()
export class UserController {
  constructor(
    private readonly user: UserService
  ) { }

  @Post('/register')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './public/avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString())
            .join('')
          cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    })
  )
  async register(@Body() data: UserDTO, @UploadedFile() file: any) {
    cloudinary.config({
      cloud_name: config.get('cloudinary.cloudname'),
      api_key: config.get('cloudinary.key'),
      api_secret: config.get('cloudinary.secret')
    });

    return await this.user.register({
      nik: data.nik,
      name: data.name,
      country: data.country,
      picture: file.filename
    }).then((user) => {
      cloudinary.v2.uploader.upload(file.path, {
        crop: "fill",
        tags: "avatars",
        gravity: "faces",
        width: 300,
        height: 200
      }, (result) => {
        console.log(result)
      });
      return user
    })
  }

  @Get('/nik/:nik')
  async checkNIK(@Param('nik') nik: string) {
    const user = await this.user.checkNIK(nik)
    if (!user) {
      return {
        exist: false
      }
    }

    return {
      exist: true
    }
  }
}
