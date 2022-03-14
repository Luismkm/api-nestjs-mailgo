import { PartialType } from '@nestjs/mapped-types';
import { CreateUnsubscribeDto } from './create-unsubscribe.dto';

export class UpdateUnsubscribeDto extends PartialType(CreateUnsubscribeDto) {}
