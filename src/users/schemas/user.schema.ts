import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { UserRole } from '../user-roles.enum'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  _id?: Types.ObjectId

  @Prop({ type: String })
  name: string

  @Prop({ type: String, required: true, unique: true, lowercase: true })
  email: string

  @Prop({ type: String, unique: true, trim: true })
  primaryPhone: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String, default: UserRole.REGULAR })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User)
