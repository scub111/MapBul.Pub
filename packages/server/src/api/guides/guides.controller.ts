import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { IGuideDTO } from 'server/api/guides/guide.dto';
import { GuidesService } from 'server/api/guides/guides.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/guides')
export class GuidesController implements IController<IGuideDTO> {
  constructor(private readonly service: GuidesService) {}

  @Get()
  async getAll(): Promise<IGuideDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: IGuideDTO): IGuideDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: IGuideDTO): IGuideDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<IGuideDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: IGuideDTO): IGuideDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IGuideDTO {
    throw new Error('Method not implemented.');
  }
}
