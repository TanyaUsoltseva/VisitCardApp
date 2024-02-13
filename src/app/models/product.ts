export interface IProduct {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  favorite?: boolean,
  count?: number,
  forAllPrice: number,
  rating: {
    rate: number,
    count: number
  }
}
