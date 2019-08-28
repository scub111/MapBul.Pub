import { TID } from './types';

export interface IController<T> {
    getAll(): Promise<T[]> | T[];
    postItem(item: T): T;
    putAll(item: T): T;
    deleteAll(): void;
    getItem(id: TID): T;
    putItem(id: TID): T;
    deleteItem(id: TID): T;
}
