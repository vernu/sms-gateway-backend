import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { LoginInputDTO, RegisterInputDTO } from './auth.dto'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  async login(@Body() input: LoginInputDTO) {
    const data = await this.authService.login(input)
    return { data }
  }

  @ApiOperation({ summary: 'Register' })
  @Post('/register')
  async register(@Body() input: RegisterInputDTO) {
    const data = await this.authService.register(input)
    return { data }
  }

  
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Generate Api Key' })
  @Post('/api-keys')
  async generateApiKey(@Request() req) {
    const { apiKey, message } = await this.authService.generateApiKey(req.user)
    return { data: apiKey, message }
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Api Key List (masked***)' })
  @Get('/api-keys')
  async getApiKey(@Request() req) {
    const data = await this.authService.getUserApiKeys(req.user)
    return { data }
  }
}
