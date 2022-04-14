import {
    SCHEDULE_CARD,
    SCHEDULE_CARDS,
    SCHEDULE_CARDS_CONTAINER,
    SCHEDULE_CARD_AFTERIMAGE,
    SCHEDULE_CARD_DELETE_BTN,
    SCHEDULE_COLUMN,
    DRAG_CARD,
} from "../../utils/styleNames.js";
import * as scheduleModel from "../model/scheduleModel.js";
import { changeCardNumber } from "./scheduleCardCount.js";

const $main = document.querySelector("#main");
let dragCard;
let afterimageCard;
let selectedCard;
let selectedCardData;

const TOP = "top";
const BOTTOM = "bottom";

const getDragDirection = (element, y) => {
    const box = element.getBoundingClientRect();
    const offset = y - (box.top + box.height / 2);
    return offset < 0 ? TOP : BOTTOM;
};

const getElementBelowDragPointer = (event) => {
    dragCard.style.display = "none";
    const $elementBelowDragPointer = document.elementFromPoint(
        event.clientX,
        event.clientY
    );
    dragCard.style.display = "flex";

    return $elementBelowDragPointer;
};

const appendAfterimageCardInCards = ($cardsContainer) => {
    const $cards = $cardsContainer.querySelector(`.${SCHEDULE_CARDS}`);
    const tempAfterimageCard = afterimageCard;
    afterimageCard.remove();
    $cards.appendChild(tempAfterimageCard);
    afterimageCard = tempAfterimageCard;
};

const moveAfterimageCard2DragPoint = (
    $scheduleCardBelowDragPointer,
    location
) => {
    const tempAfterimageCard = afterimageCard;
    switch (location) {
        case TOP: {
            afterimageCard.remove();
            $scheduleCardBelowDragPointer.before(tempAfterimageCard);
            afterimageCard = tempAfterimageCard;
            break;
        }
        case BOTTOM: {
            afterimageCard.remove();
            $scheduleCardBelowDragPointer.after(tempAfterimageCard);
            afterimageCard = tempAfterimageCard;
            break;
        }
    }
};

const mouseMoveOnDraggingEventHandler = (event) => {
    $main.appendChild(dragCard);
    relocateDragCard(event.pageX, event.pageY);
    const $elementBelowDragPointer = getElementBelowDragPointer(event);

    if (!$elementBelowDragPointer) {
        return;
    }

    if ($elementBelowDragPointer.classList.contains(SCHEDULE_CARDS_CONTAINER)) {
        appendAfterimageCardInCards($elementBelowDragPointer);
        return;
    }

    if (!$elementBelowDragPointer.classList.contains(SCHEDULE_CARD)) {
        return;
    }

    const $scheduleCardBelowDragPointer = $elementBelowDragPointer;
    const dragDirection = getDragDirection(
        $scheduleCardBelowDragPointer,
        event.pageY
    );
    moveAfterimageCard2DragPoint($scheduleCardBelowDragPointer, dragDirection);
};

const removeMouseEventOnDragging = () => {
    $main.removeEventListener("mouseup", mouseUpOnDraggingEventHandler);
    $main.removeEventListener("mousemove", mouseMoveOnDraggingEventHandler);
};

const removeDragCard = () => {
    dragCard.remove();
};

const resetGlobalVariables = () => {
    afterimageCard = null;
    selectedCard = null;
    selectedCardData = null;
    dragCard = null;
};

const insertAfterimageCardToModel = (afterimageCard) => {
    const columnId = afterimageCard.closest(`.${SCHEDULE_COLUMN}`).dataset.id;
    const $scheduleCards = afterimageCard.closest(`.${SCHEDULE_CARDS}`);
    const afterCardBrowserIndex = [...$scheduleCards.children].findIndex(
        (card) => card.classList.contains(SCHEDULE_CARD_AFTERIMAGE) === true
    );
    const afterCardModelIndex =
        [...$scheduleCards.children].length - afterCardBrowserIndex - 1;
    scheduleModel.insertScheduleCard(
        columnId,
        selectedCardData,
        afterCardModelIndex
    );
    changeCardNumber(columnId);
};

const mouseUpOnDraggingEventHandler = () => {
    removeMouseEventOnDragging();
    insertAfterimageCardToModel(afterimageCard);
    afterimageCard.classList.replace(SCHEDULE_CARD_AFTERIMAGE, SCHEDULE_CARD);
    removeDragCard();
    resetGlobalVariables();
};

const addMouseEventOnDragging = () => {
    $main.addEventListener("mousemove", mouseMoveOnDraggingEventHandler);
    $main.addEventListener("mouseup", mouseUpOnDraggingEventHandler);
};

const isValid2Drag = (target) => {
    const isDeleteBtn = target.closest(`.${SCHEDULE_CARD_DELETE_BTN}`);
    return selectedCard && !isDeleteBtn;
};

const relocateDragCard = (pageX, pageY) => {
    dragCard.style.left = `${pageX - dragCard.offsetWidth / 2}px`;
    dragCard.style.top = `${pageY - dragCard.offsetHeight / 2}px`;
};

const removeSelectedCardFromModel = (selectedCard) => {
    const columnId = selectedCard.closest(`.${SCHEDULE_COLUMN}`).dataset.id;
    const cardId = selectedCard.dataset.cardId;

    selectedCardData = scheduleModel.getScheduleCardDataById(columnId, cardId);
    scheduleModel.removeScheduleCard(columnId, cardId);
    changeCardNumber(columnId);
};

export const mouseDownEventHandler = (event) => {
    const target = event.target;
    selectedCard = target.closest(`.${SCHEDULE_CARD}`);

    if (!isValid2Drag(target)) {
        return;
    }

    removeSelectedCardFromModel(selectedCard);

    dragCard = selectedCard.cloneNode(true);
    selectedCard.classList.replace(SCHEDULE_CARD, SCHEDULE_CARD_AFTERIMAGE);
    dragCard.classList.replace(SCHEDULE_CARD, DRAG_CARD);
    afterimageCard = selectedCard;

    addMouseEventOnDragging();
};
