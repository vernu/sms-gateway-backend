import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Device, DeviceDocument } from './schemas/device.schema'
import { Model } from 'mongoose'
import * as firebaseAdmin from 'firebase-admin'
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

  async sendSMS(deviceId: string, smsData): Promise<any> {
    const device = await this.deviceModel.findById(deviceId)

    if (!device) {
      throw new HttpException(
        {
          error: 'Device not found',
        },
        HttpStatus.NOT_FOUND,
      )
    } else {
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

        console.log('Successfully sent message:', response)
        return response
      } catch (e) {
        console.log('Error sending message:', e)
        throw new HttpException(
          {
            error: 'Failed to send SMS',
          },
          HttpStatus.BAD_REQUEST,
        )
      }
    }
  }
}
