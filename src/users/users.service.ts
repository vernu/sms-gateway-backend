import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(params) {
    return await this.userModel.findOne(params)
  }

  async findAll() {
    return await this.userModel.find()
  }

  async create(userData: any) {
    const { name, email, password } = userData
    if (await this.findOne({ email })) {
      throw new HttpException(
        {
          error: 'user exists with the same email',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    })
    return await newUser.save()
  }
}
