import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { RegisterDeviceInputDTO, SendSMSInputDTO } from './gateway.dto'
import { GatewayService } from './gateway.service'

@ApiTags('gateway')
@ApiBearerAuth()
@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Register device' })
  @ApiQuery({
    name: 'apiKey',
    required: false,
    description: 'Required if jwt bearer token not provided',
  })
  @Post('/devices')
  async registerDevice(@Body() input: RegisterDeviceInputDTO, @Request() req) {
    const data = await this.gatewayService.registerDevice(input, req.user)
    return { data }
  }

  @ApiOperation({ summary: 'Update device' })
  @ApiQuery({
    name: 'apiKey',
    required: false,
    description: 'Required if jwt bearer token not provided',
  })
  @Patch('/devices/:id')
  async updateDevice(
    @Param('id') deviceId: string,
    @Body() input: RegisterDeviceInputDTO,
  ) {
    const data = await this.gatewayService.updateDevice(deviceId, input)
    return { data }
  }

  @ApiOperation({ summary: 'Send SMS to a device' })
  @ApiQuery({
    name: 'apiKey',
    required: false,
    description: 'Required if jwt bearer token not provided',
  })
  @Post('/devices/:id/sendSMS')
  async sendSMS(
    @Param('id') deviceId: string,
    @Body() smsData: SendSMSInputDTO,
  ) {
    const data = await this.gatewayService.sendSMS(deviceId, smsData)
    return { data }
  }
}
