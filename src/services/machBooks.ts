import { baseUrl } from "./consts";
import { IMachBook } from "./models";

export type PaginationType = {
  limit: number;
  skip: number;
};

export interface IPaginatedItems<T> {
  items: T[];
  total: number;
}

class MachBooksServiceClass {
  async getBooks({
    limit,
    skip,
  }: PaginationType): Promise<IPaginatedItems<IMachBook>> {
    try {
      const response: IMachBook[] = await fetch(`${baseUrl}/books`).then(
        (res) => res.json()
      );

      const data = {
        items: [...response].splice(skip * limit, limit),
        total: response.length,
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getBookDetails(id: string) {
    try {
      const response: IMachBook = await fetch(`${baseUrl}/books/${id}`).then(
        (res) => res.json()
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const MachBooksService = new MachBooksServiceClass();
