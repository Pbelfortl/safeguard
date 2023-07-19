import { Module } from '@nestjs/common';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { CredentialRepository } from './credential.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[PrismaModule, UserModule, AuthModule],
  controllers: [CredentialController],
  providers: [CredentialService, CredentialRepository]
})
export class CredentialModule {}
