import { Body, Controller, Post } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller('gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('/registerDevice')
  async registerDevice(@Body() input: any) {
    const data = await this.gatewayService.registerDevice(input)
    return { data }
  }
}
