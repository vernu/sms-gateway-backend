import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { GatewayModule } from './gateway/gateway.module'

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
