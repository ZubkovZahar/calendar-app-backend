import { validate } from 'class-validator';
import { IsEndAfterStart } from './is-end-after-start.validator';

class TestDto {
  start: Date | undefined;

  @IsEndAfterStart()
  end: Date | undefined;
}

describe('IsEndAfterStart', () => {
  let dto: TestDto;

  beforeEach(() => {
    dto = new TestDto();
  });

  it('pass if start before end', async () => {
    dto.start = new Date();
    dto.end = new Date(dto.start.getTime() + 1000);

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('pass if start is missing', async () => {
    dto.start = undefined;

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('pass if end is missing', async () => {
    dto.end = undefined;

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('pass if dates are missing', async () => {
    dto.start = undefined;
    dto.end = undefined;

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('fail if start after end', async () => {
    dto.start = new Date();
    dto.end = new Date(dto.start.getTime() - 1000);

    const errors = await validate(dto);

    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isEndAfterStart');
  });

  it('fail if dates are equal', async () => {
    dto.start = new Date();
    dto.end = new Date();

    const errors = await validate(dto);

    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isEndAfterStart');
  });
});
