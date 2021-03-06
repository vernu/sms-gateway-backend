import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Device, DeviceDocument } from './schemas/device.schema'
import { Model } from 'mongoose'
import * as firebaseAdmin from 'firebase-admin'
import { RegisterDeviceInputDTO, SendSMSInputDTO } from './gateway.dto'
import { User } from 'src/users/schemas/user.schema'
@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async registerDevice(
    input: RegisterDeviceInputDTO,
    user: User,
  ): Promise<any> {
    return await this.deviceModel.create({ ...input, user })
  }

  async updateDevice(
    deviceId: string,
    input: RegisterDeviceInputDTO,
  ): Promise<any> {
    const device = await this.deviceModel.findById(deviceId)

    if (!device) {
      throw new HttpException(
        {
          error: 'Device not found',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return await this.deviceModel.findByIdAndUpdate(
      deviceId,
      { $set: input },
      { new: true },
    )
  }

  async sendSMS(deviceId: string, smsData: SendSMSInputDTO): Promise<any> {
    const device = await this.deviceModel.findById(deviceId)

    if (!device) {
      throw new HttpException(
        {
          error: 'Device not found',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    if (!device.enabled) {
      throw new HttpException(
        {
          success: false,
          error: 'Device is disabled',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const payload: any = {
      // notification: {
      //   title: 'SMS',
      //   body: 'message',
      // },
      data: {
        smsData: JSON.stringify(smsData),
      },
    }
    try {
      const response = await firebaseAdmin
        .messaging()
        .sendToDevice(device.fcmToken, payload, { priority: 'high' })
      return response
    } catch (e) {
      throw new HttpException(
        {
          error: 'Failed to send SMS',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
