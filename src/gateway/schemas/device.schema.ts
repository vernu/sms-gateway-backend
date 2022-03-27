import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type DeviceDocument = Device & Document

@Schema({ timestamps: true })
export class Device {
  _id?: Types.ObjectId

  @Prop({ type: String })
  fcmToken: string

  @Prop({ type: String })
  brand: string

  @Prop({ type: String })
  manufacturer: string

  @Prop({ type: String })
  model: string

  @Prop({ type: String })
  serial: string

  @Prop({ type: String })
  buildId: string

  @Prop({ type: String })
  os: string

  @Prop({ type: String })
  osVersion: string

  @Prop({ type: String })
  appVersionName: string

  @Prop({ type: Number })
  appVersionCode: number
}

export const DeviceSchema = SchemaFactory.createForClass(Device)
