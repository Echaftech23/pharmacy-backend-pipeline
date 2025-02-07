import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { DatabaseHealthController } from './database.health.controller';
import mongoose from 'mongoose';

// Désactiver les avertissements de Mongoose globalement
mongoose.set('strictQuery', true);

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb+srv://rachidchaf2001:EL7NjIbf4n1Dk4ty@cluster0.bu5c5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  controllers: [DatabaseHealthController],
  exports: [DatabaseService],
})
export class DatabaseModule {}
