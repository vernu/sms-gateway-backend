import { Body, Controller, Param, Post } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('/devices')
  async registerDevice(@Body() input: any) {
    const data = await this.gatewayService.registerDevice(input)
    return { data }
  }
  @Post('/devices/:id/updateFCMToken')
  async updateFCMToken(@Param('id') deviceId: string, @Body() input: any) {
    const data = await this.gatewayService.updateFCMToken(deviceId, input)
    return { data }
  }

  @Post('/devices/:id/sendSMS')
  async sendSMS(@Param('id') deviceId: string, @Body() smsData: any) {
    const data = await this.gatewayService.sendSMS(deviceId, smsData)
    return { data }
  }
}
