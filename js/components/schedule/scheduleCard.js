import { ScheduleDeleteConfirm } from "./scheduleDeleteConfirm.js";

export class ScheduleCard {
    constructor({ target, cardData, passedEventHandler }) {
        this.$target = target;
        this.$scheduleCard;
        this.cardData = cardData;
        this.passedEventHander = passedEventHandler;
        this.$cardOnEditing;
        this.init();
    }

    init() {
        this.render();
        this.setDOMElement();
        this.setEvent();
    }

    render() {
        const scheduleCardTemplate = this.template();
        this.$target.insertAdjacentHTML("afterbegin", scheduleCardTemplate);
    }

    setDOMElement() {
        this.$scheduleCard = this.$target.querySelector(
            `[data-card-id="${this.cardData.id}"]`
        );
    }

    setEvent() {
        const $scheduleCardDeleteBtn = this.$target.querySelector(
            ".schedule-card__delete-btn"
        );
        $scheduleCardDeleteBtn.addEventListener(
            "mouseenter",
            this.cardDeleteBtnMouseenterEventHandler.bind(this)
        );
        $scheduleCardDeleteBtn.addEventListener(
            "mouseleave",
            this.cardDeleteBtnMouseleaveEventHandler.bind(this)
        );
        $scheduleCardDeleteBtn.addEventListener(
            "click",
            this.cardDeleteBtnClickEventHandler.bind(this)
        );
    }

    cardDeleteBtnClickEventHandler() {
        const scheduleDeleteConfirmParams = {
            target: this.$scheduleCard,
            passedEventHandler: {
                removeCard: this.passedEventHander.removeCard.bind(this),
            },
        };
        new ScheduleDeleteConfirm(scheduleDeleteConfirmParams);
    }

    cardDeleteBtnMouseenterEventHandler() {
        this.$scheduleCard.classList.toggle("schedule-card--active-red");
    }

    cardDeleteBtnMouseleaveEventHandler() {
        this.$scheduleCard.classList.toggle("schedule-card--active-red");
    }

    setEvent() {
        this.$target.addEventListener(
            "click",
            this.cardClickEventHandler.bind(this)
        );
    }

    cardClickEventHandler({ target }) {
        this.clickCount += 1;

        if (this.clickCount === 1) {
            const $cancelBtn = this.$target.querySelector(
                ".schedule-edit-card__cancel-btn"
            );

            if (target === $cancelBtn) {
                this.cancelEdit(target);
            }
            setTimeout(() => {
                this.clickCount = 0;
            }, 300);
            return;
        } else if (this.clickCount === 2) {
            this.editScheduleCard.call(this, target);
            this.clickCount = 0;
        }
    }

    cancelEdit(target) {
        const $editCard = target.closest(".schedule-edit-card");
        if (!$editCard) return;

        this.$target.replaceChild(this.$cardOnEditing, $editCard);
        this.$cardOnEditing = undefined;
    }

    editScheduleCard(target) {
        this.replaceCard2EditCard(target);
    }

    replaceCard2EditCard(target) {
        this.$cardOnEditing = target.closest(".schedule-card");
        if (!this.$cardOnEditing) return;

        const editCard = this.createEditCard();
        this.$target.replaceChild(editCard, this.$cardOnEditing);
    }

    createEditCard() {
        const $cardTitle = this.$cardOnEditing.querySelector(
            ".schedule-card__title"
        );
        const $cardBody = this.$cardOnEditing.querySelector(
            ".schedule-card__body"
        );

        const cardId = this.$cardOnEditing.dataset.cardId;
        const cardTitle = $cardTitle.innerText;
        const cardBody = $cardBody.innerText;

        const editCard = document.createElement("div");
        editCard.classList.add("schedule-edit-card");
        editCard.dataset.cardId = cardId;
        editCard.innerHTML = this.editCardTemplate(cardTitle, cardBody);

        return editCard;
    }

    editCardTemplate(cardTitle, cardBody) {
        return `<form class="schedule-edit-card__text-container">
                    <textarea 
                        class="schedule-edit-card__title"  
                        placeholder="제목을 입력하세요"
                        rows="1"
                        maxLength="${this.LIMIT}"
                    >${cardTitle}</textarea>
                    <textarea 
                        class="schedule-edit-card__body" 
                        placeholder="내용을 입력하세요"
                        rows="1"
                        maxLength="${this.LIMIT}"
                    >${cardBody}</textarea>
                </form>
                <div class="schedule-edit-card__btns-container">
                    <button class="schedule-edit-card__cancel-btn">
                        취소
                    </button>
                    <button class="schedule-edit-card__edit-btn inactive">
                        수정
                    </button>
                </div>`;
    }

    template() {
        return `<div class="schedule-card" data-card-id="${this.cardData.id}">
                    <div class="schedule-card__text-container">
                        <h3 class="schedule-card__title">
                            ${this.cardData.title}
                        </h3>
                        <p class="schedule-card__body">${this.cardData.body}</p>
                        <p class="schedule-card__caption">${this.cardData.caption}</p>
                    </div>
                    <svg
                        class="schedule-card__delete-btn"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                        />
                    </svg>
                </div>`;
    }
}
