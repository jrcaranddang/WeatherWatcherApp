export class Card {
  constructor(
    public userId: string,
    public cityName: string,
    public cityAPIUrl: string,
    public isFavorited: Boolean
  ) {  }
}