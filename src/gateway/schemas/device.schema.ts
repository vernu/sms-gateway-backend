import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type DeviceDocument = Device & Document

@Schema({ timestamps: true })
export class Device {
  _id?: Types.ObjectId
  @Prop({ type: String })
  fcmToken: string
}

export const DeviceSchema = SchemaFactory.createForClass(Device)
