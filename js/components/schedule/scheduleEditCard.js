export class ScheduleEditCard {
    LIMIT = 500;
    constructor({ original }) {
        this.$originalCard = original;
        this.$editCard;
        this.init();
    }

    init() {
        this.render();
        this.setEvent();
    }

    render() {
        this.createEditCard();
        const parentNode = this.$originalCard.parentNode;
        parentNode.replaceChild(this.$editCard, this.$originalCard);
    }

    setEvent() {
        this.$editCard.addEventListener(
            "click",
            this.clickEventHandler.bind(this)
        );
    }

    clickEventHandler({ target }) {
        const $cancelBtn = this.$editCard.querySelector(
            ".schedule-edit-card__cancel-btn"
        );
        const $editBtn = this.$editCard.querySelector(
            ".schedule-edit-card__edit-btn"
        );

        if (target === $cancelBtn) {
            this.cancelEdit();
        }
        if (target === $editBtn) {
            this.editBtnClickEventHandler();
        }
    }

    editBtnClickEventHandler() {
        // if (target.classList.contains("inactive")) {
        //     return;
        // }
        const $cardTitle = this.$editCard.querySelector(
            ".schedule-edit-card__title"
        );
        const $cardBody = this.$editCard.querySelector(
            ".schedule-edit-card__body"
        );

        const cardData = {
            title: $cardTitle.value,
            body: $cardBody.value,
            caption: "author by web",
        };

        const $cardTitleOfCardOnEditing = this.$originalCard.querySelector(
            ".schedule-card__title"
        );
        const $cardBodyOfCardOnEditing = this.$originalCard.querySelector(
            ".schedule-card__body"
        );
        $cardTitleOfCardOnEditing.innerText = cardData.title;
        $cardBodyOfCardOnEditing.innerText = cardData.body;

        const parentNode = this.$editCard.parentNode;
        parentNode.replaceChild(this.$originalCard, this.$editCard);
    }

    cancelEdit() {
        const parentNode = this.$editCard.parentNode;
        parentNode.replaceChild(this.$originalCard, this.$editCard);
    }

    createEditCard() {
        const cardTitle = this.$originalCard.querySelector(
            ".schedule-card__title"
        ).innerText;
        const cardBody = this.$originalCard.querySelector(
            ".schedule-card__body"
        ).innerText;

        this.$editCard = document.createElement("div");
        this.$editCard.classList.add("schedule-edit-card");
        this.$editCard.innerHTML = this.template(cardTitle, cardBody);
    }

    template(cardTitle, cardBody) {
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
}
