export interface Books {
  id: number;
  titulo: string;
  description: string;
  price: number;
  datePublication?: Date;
  author: {
    id: string;
    completeName: string;
  };
}
