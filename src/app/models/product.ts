export interface IProduct {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  favorite?: boolean,
  count: number,
  forAllPrice: number,
  _id: string,
  rating: {
    rate: number,
    count: number
  }
}
