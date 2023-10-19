const _ = require('lodash');

class CardsRepository {

    constructor({ cardModel }) {

        this.cardModel = cardModel;
    }

    async create(data) {

        let cardData = _.pick(data, ['name', 'expiryDate', 'cvv']);

        cardData.last4 = data.number.toString().substring(data.number.length - 4, data.number.toString().length);


        try {

            const createdCard = await this.cardModel.create(cardData);

            return createdCard;


        } catch (err) {
            console.error(err);

            throw err;
        }

    };

    async findAll(query) {

        try {

            const cards = await cardModel.findAll({ where: query });

            return cards;

        } catch (error) {
            console.error(err);

            throw err;
        }
    }

    async findOne(query) {

        try {

            const card = await cardModel.findOne({
                raw: true,
                where: query
            });

            return card;

        } catch (error) {

            console.error(err);

            throw err;
        }
    }

}

module.exports = Object.assign({}, { CardsRepository });