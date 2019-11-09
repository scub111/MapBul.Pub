import { Controller, Get, Post, Put, Delete, Param, UseInterceptors } from '@nestjs/common';
import { TID } from 'server/common/types';
import { IGetParams } from 'server/common/interfaces';
import { IController } from 'server/common/IController';
import { ICountryPermissionDTO } from 'server/api/countrypermissions/countryPermission.dto';
import { CountryPermissionsService } from 'server/api/countrypermissions/countryPermissions.service';
import { NotFoundInterceptor } from 'server/interceptors/NotFoundInterceptor';

@Controller('api/countrypermissions')
export class CountryPermissionsController implements IController<ICountryPermissionDTO> {
  constructor(private readonly service: CountryPermissionsService) {}

  @Get()
  async getAll(): Promise<ICountryPermissionDTO[]> {
    return this.service.getAll();
  }

  @Post()
  postItem(item: ICountryPermissionDTO): ICountryPermissionDTO {
    throw new Error('Method not implemented.');
  }

  @Put()
  putAll(item: ICountryPermissionDTO): ICountryPermissionDTO {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async getItem(@Param() params: IGetParams): Promise<ICountryPermissionDTO> {
    return await this.service.getItem(params.id);
  }

  @Delete()
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  putItem(id: TID, item: ICountryPermissionDTO): ICountryPermissionDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): ICountryPermissionDTO {
    throw new Error('Method not implemented.');
  }
}
