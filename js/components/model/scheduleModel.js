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

const response = await fetch("http://localhost:3000/todos");
const scheduleModel = await response.json();

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
