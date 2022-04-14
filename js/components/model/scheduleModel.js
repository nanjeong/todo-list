import { request2Server } from "../../utils/utils.js";

const findScheduleColumn = (columnId) => {
    return scheduleModel.find(
        (scheduleColumnData) => scheduleColumnData.id === columnId
    );
};

const getScheduleColumnTitle = (columnId) => {
    return findScheduleColumn(columnId).title;
};

const getScheduleCards = (columnId) => {
    return findScheduleColumn(columnId).cards;
};

const addScheduleCard = (columnId, cardData) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    cardsInScheduleColumn.unshift(cardData);
};

const removeScheduleCard = (columnId, cardId) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    findScheduleColumn(columnId).cards = cardsInScheduleColumn.filter(
        (card) => card.id !== cardId
    );

    request2Server(`http://localhost:3000/todos/${cardId}`, "DELETE")

};

const updateScheduleCard = (columnId, cardData) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    const index = cardsInScheduleColumn.findIndex(
        (card) => card.id === cardData.id
    );
    cardsInScheduleColumn[index] = cardData;
};

const insertScheduleCard = (columnId, cardData, index) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    cardsInScheduleColumn.splice(index, 0, cardData);
};

const getScheduleCardDataById = (columnId, cardId) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    const cardData = cardsInScheduleColumn.find((card) => card.id === cardId);

    return cardData;
};

const getScheduleCardNumberInColumn = (columnId) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    return cardsInScheduleColumn.length;
};

const parsingScheduleModel = (fetchedData) => {
    fetchedData.forEach((cardData) => {
        let column = scheduleModel.find(columnData => columnData.id === cardData.columnId)
        if(column) {
            const card = {
                title: cardData.title,
                body: cardData.body,
                caption: cardData.caption,
                id: cardData.id
            }
            column.cards.push(card)
        }
        else {
            column = {
                id: cardData.columnId,
                title: cardData.columnTitle,
                cards: [
                    {
                        title: cardData.title,
                        body: cardData.body,
                        caption: cardData.caption,
                        id: cardData.id
                    }
                ]
            }
            scheduleModel.push(column)
        }
    })
}

const fetchedData = await request2Server("http://localhost:3000/todos")
const scheduleModel = []
parsingScheduleModel(fetchedData)

export {
    scheduleModel,
    getScheduleColumnTitle,
    getScheduleCards,
    addScheduleCard,
    removeScheduleCard,
    updateScheduleCard,
    getScheduleCardDataById,
    insertScheduleCard,
    getScheduleCardNumberInColumn,
};
