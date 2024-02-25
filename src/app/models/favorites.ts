export interface IFavorite {
  _id?: string,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  favorite?: boolean,
  count: number,
  userId?: string
}
