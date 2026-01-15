import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IsEndAfterStart } from 'src/common/validators/is-end-after-start.validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Event start date (ISO8601)',
    example: '2024-12-31T23:59:59.000Z',
  })
  @Type(() => Date)
  @IsDate()
  start: Date;

  @ApiProperty({
    description: 'Event end date (ISO8601)',
    example: '2025-01-02T00:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  @IsEndAfterStart()
  end: Date;
}
