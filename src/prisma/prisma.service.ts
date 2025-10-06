import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import e from 'express';


@Injectable()
export class PrismaService extends PrismaClient {
  
}
