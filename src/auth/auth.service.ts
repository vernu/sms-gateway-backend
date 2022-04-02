import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(_id: string): Promise<any> {
    const user = await this.usersService.findOne({ _id })
    if (user) {
      return user
    }
    return null
  }

  async login(userData: any) {
    const user = await this.usersService.findOne({ email: userData.email })
    if (!user) {
      throw new HttpException(
        { error: 'User not found' },
        HttpStatus.UNAUTHORIZED,
      )
    }

    if (!(await bcrypt.compare(userData.password, user.password))) {
      throw new HttpException(
        { error: 'Invalid credentials' },
        HttpStatus.UNAUTHORIZED,
      )
    }

    const payload = { email: user.email, sub: user._id }
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    }
  }

  async register(userData: any) {
    const user = await this.usersService.create(userData)

    const payload = { email: user.email, sub: user._id }

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    }
  }
}
