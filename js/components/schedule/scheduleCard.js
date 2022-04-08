import { ScheduleEditCard } from "./scheduleEditCard.js";

export class ScheduleCard {
    constructor(target, cardData) {
        this.$target = target;
        this.cardData = cardData;
        this.init();
    }

    init() {
        this.render();
        this.setEvent();
    }

    render() {
        const $scheduleCard = this.template();
        this.$target.insertAdjacentHTML("afterbegin", $scheduleCard);
    }

    setEvent() {
        this.$target.addEventListener(
            "click",
            this.cardClickEventHandler().bind(this)
        );
    }

    cardClickEventHandler() {
        let clickCount = 0;
        let timerId;

        return ({ target }) => {
            clickCount += 1;
            if (clickCount === 1) {
                timerId = setTimeout(() => {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(timerId);
                clickCount = 0;

                const $selectedCard = target.closest(".schedule-card");
                const scheduleEditCardParams = {
                    original: $selectedCard,
                };

                new ScheduleEditCard(scheduleEditCardParams);
            }
        };
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
                            fill="#828282"
                        />
                    </svg>
                </div>`;
    }
}
