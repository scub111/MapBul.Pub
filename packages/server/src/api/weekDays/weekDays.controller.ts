import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IWeekDayDTO } from 'server/api/weekdays/weekDay.dto';
import { WeekDaysService } from 'server/api/weekdays/weekDays.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/weekdays')
export class WeekDaysController implements IController<IWeekDayDTO> {
  constructor(private readonly service: WeekDaysService) {}

  @Get()
  async getAll(): Promise<IWeekDayDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IWeekDayDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IWeekDayDTO): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IWeekDayDTO {
    throw new Error('Method not implemented.');
  }
}
