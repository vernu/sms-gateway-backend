import { Body, Controller, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GatewayService } from './gateway.service'

@ApiTags('gateway')
@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('/devices')
  async registerDevice(@Body() input: RegisterDeviceInputDTO) {
    const data = await this.gatewayService.registerDevice(input)
    return { data }
  }
  @Post('/devices/:id/updateFCMToken')
  async updateFCMToken(
    @Param('id') deviceId: string,
    @Body() input: UpdateFCMTokenInputDTO,
  ) {
    const data = await this.gatewayService.updateFCMToken(deviceId, input)
    return { data }
  }

  @Post('/devices/:id/sendSMS')
  async sendSMS(
    @Param('id') deviceId: string,
    @Body() smsData: SendSMSInputDTO,
  ) {
    const data = await this.gatewayService.sendSMS(deviceId, smsData)
    return { data }
  }
}
