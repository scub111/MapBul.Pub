import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { Pagination, IEditorDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class EditorsService extends BaseService<IEditorDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(query: GetAllQueryDTO): Promise<Pagination<IEditorDTO>> {
    let additional = '';
    const isPagenation = query.page && query.size;
    if (isPagenation) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM editor`;
    }
    const records = await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM editor ${additional}`);

    return {
      content: isPagenation ? records[0] : records,
      totalPages: isPagenation ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
    };
  }

  postItem(item: IEditorDTO): Promise<IEditorDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IEditorDTO): IEditorDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IEditorDTO> {
    return (await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`firstName\`,
        \`middleName\`,
        \`lastName\`,
        \`gender\`,
        \`phone\`,
        \`birthDate\`,
        \`address\`
      FROM editor
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IEditorDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IEditorDTO {
    throw new Error('Method not implemented.');
  }
}
