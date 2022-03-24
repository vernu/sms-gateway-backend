import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Device, DeviceDocument } from './schemas/device.schema'
import { Model } from 'mongoose'
@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async registerDevice(input: any): Promise<any> {
    const { fcmToken } = input
    const newDevice = await this.deviceModel.create({ fcmToken })
    return newDevice
  }

  async updateFCMToken(deviceId: string, input: any): Promise<any> {
    const { fcmToken } = input
    const device = await this.deviceModel.findById(deviceId)

    if (!device) {
      throw new HttpException(
        {
          error: 'Device not found',
        },
        HttpStatus.NOT_FOUND,
      )
    } else {
      device.fcmToken = fcmToken
      return await device.save()
    }
  }
}
