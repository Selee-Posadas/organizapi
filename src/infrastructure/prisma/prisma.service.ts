import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        if (!process.env.PRISMA_ACCELERATE_URL) {
            throw new Error(
                'PRISMA_ACCELERATE_URL is not defined. Check your .env file.'
            )
        }

        super(
            {
                accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
            }
        );
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}
