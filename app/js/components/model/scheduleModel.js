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

const getColumnTitle = (columnId) => {
    return scheduleModel.find((column) => column.id === columnId).title;
};

const getCardDataForServer = (columnId, cardData) => {
    return {
        id: cardData.id,
        title: cardData.title,
        body: cardData.body,
        caption: cardData.caption,
        columnTitle: getColumnTitle(columnId),
        columnId: columnId,
    };
};

const addScheduleCard = (columnId, cardData) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    cardsInScheduleColumn.unshift(cardData);

    const dataForServer = getCardDataForServer(columnId, cardData);
    history.push({
        event: "post",
        cardData: dataForServer,
    });
};

const removeScheduleCard = (columnId, cardId) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    findScheduleColumn(columnId).cards = cardsInScheduleColumn.filter(
        (card) => card.id !== cardId
    );

    history.push({
        event: "delete",
        cardId: cardId,
    });
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

    const dataForServer = getCardDataForServer(columnId, cardData);
    history.push({
        event: "post",
        cardData: dataForServer,
    });
};

const getScheduleCardDataById = (columnId, cardId) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    const cardData = cardsInScheduleColumn.find((card) => card.id === cardId);

    return cardData;
};

const getScheduleCardNumberInColumn = (columnId) => {
    const cardsInScheduleColumn = findScheduleColumn(columnId).cards;
    return cardsInScheduleColumn.length - 1;
};

const parsingScheduleModel = (fetchedData) => {
    fetchedData.forEach((cardData) => {
        let column = scheduleModel.find(
            (columnData) => columnData.id === cardData.columnId
        );
        if (column) {
            const card = {
                title: cardData.title,
                body: cardData.body,
                caption: cardData.caption,
                id: cardData.id,
            };
            column.cards.push(card);
        } else {
            column = {
                id: cardData.columnId,
                title: cardData.columnTitle,
                cards: [
                    {
                        title: cardData.title,
                        body: cardData.body,
                        caption: cardData.caption,
                        id: cardData.id,
                    },
                ],
            };
            scheduleModel.push(column);
        }
    });
};

const fetchedData = await request2Server(
    "https://nanbangtodo.herokuapp.com/todos"
);
const scheduleModel = [];
parsingScheduleModel(fetchedData);

const history = [];

const applyHistory2ServerInterval = () => {
    setInterval(() => {
        if (!history.length) return;
        const curHistory = history.shift();
        switch (curHistory.event) {
            case "post": {
                request2Server(
                    "https://nanbangtodo.herokuapp.com/todos",
                    "POST",
                    curHistory.cardData
                );
                break;
            }
            case "delete": {
                request2Server(
                    `https://nanbangtodo.herokuapp.com/todos/${curHistory.cardId}`,
                    "DELETE"
                );
                break;
            }
        }
    }, 1000);
};

const applyHistory2Server = async () => {
    for (const h of history) {
        switch (h.event) {
            case "post": {
                await request2Server(
                    "https://nanbangtodo.herokuapp.com/todos",
                    "POST",
                    h.cardData
                );
                break;
            }
            case "delete": {
                await request2Server(
                    `https://nanbangtodo.herokuapp.com/todos/${h.cardId}`,
                    "DELETE"
                );
                break;
            }
        }
    }
};

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
    applyHistory2Server,
    applyHistory2ServerInterval,
};
