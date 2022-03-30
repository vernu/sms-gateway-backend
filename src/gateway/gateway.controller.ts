import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  RegisterDeviceInputDTO,
  SendSMSInputDTO,
  UpdateDeviceInputDTO,
} from './gateway.dto'
import { GatewayService } from './gateway.service'

@ApiTags('gateway')
@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @ApiOperation({ summary: 'Register device' })
  @Post('/devices')
  async registerDevice(@Body() input: RegisterDeviceInputDTO) {
    const data = await this.gatewayService.registerDevice(input)
    return { data }
  }

  @ApiOperation({ summary: 'Update device' })
  @Patch('/devices/:id')
  async updateDevice(
    @Param('id') deviceId: string,
    @Body() input: UpdateDeviceInputDTO,
  ) {
    const data = await this.gatewayService.updateDevice(deviceId, input)
    return { data }
  }

  @ApiOperation({ summary: 'Send SMS to a device' })
  @Post('/devices/:id/sendSMS')
  async sendSMS(
    @Param('id') deviceId: string,
    @Body() smsData: SendSMSInputDTO,
  ) {
    const data = await this.gatewayService.sendSMS(deviceId, smsData)
    return { data }
  }
}
