class CardData {
    constructor({ id, title, images }) {
        this.id = id;
        this.title = title;
        this.url = images.fixed_height.url;
    }

    static fromApiResponse(response) {
        return response.data.map(gif => new CardData(gif));
    }
}

export default CardData;