export interface IProduct {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  favorite?: boolean,
  rating: {
    rate: number,
    count: number
  }
}
