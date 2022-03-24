import { Injectable } from '@nestjs/common'
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
}
