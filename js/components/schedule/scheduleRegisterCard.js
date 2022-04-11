import { TEXT_LENGTH_LIMIT } from "../../utils.js";

export class ScheduleRegisterCard {
    constructor() {
        this.$target;
        this.passedEventHandler;
        this.state = false;
        this.$registerCard;
        this.$cardTitle;
        this.$cardBody;
        this.$registerBtn;
    }

    init({ $target, passedEventHandler }) {
        this.render($target);
        this.setDOMElement($target);
        this.passedEventHandler = passedEventHandler;
        this.setEvent();
    }

    render($target) {
        const registerCardTemplate = this.template();
        $target.insertAdjacentHTML("afterbegin", registerCardTemplate);
    }

    setDOMElement($target) {
        this.$registerCard = $target.querySelector(
            ".schedule-register-card"
        );
        this.$cardTitle = this.$registerCard.querySelector(
            ".schedule-register-card__title"
        );
        this.$cardBody = this.$registerCard.querySelector(
            ".schedule-register-card__body"
        );
        this.$registerBtn = this.$registerCard.querySelector(
            ".schedule-register-card__register-btn"
        );
    }

    setEvent() {
        this.$registerCard.addEventListener(
            "click",
            this.registerCardClickEventHandler.bind(this)
        );
        this.$registerCard.addEventListener(
            "input",
            this.registerCardInputEventHandler.bind(this)
        );
    }

    getState() {
        return this.state;
    }

    changeState() {
        this.state = this.state ? false : true;
    }

    registerCardClickEventHandler(e) {
        if (e.target.classList.contains("schedule-register-card__cancel-btn")) {
            this.passedEventHandler.removeRegisterCard();
        }
        if (
            e.target.classList.contains("schedule-register-card__register-btn")
        ) {
            this.registerBtnClickEventHandler(e);
        }
    }

    registerCardInputEventHandler(e) {
        if (e.target.classList.contains("schedule-register-card__title")) {
            this.cardTitleInputEventHandler(e.target);
        }
        if (e.target.classList.contains("schedule-register-card__body")) {
            this.cardBodyInputEventHandler(e.target);
        }
    }

    adjustInputHeight($input) {
        $input.style.height = `auto`;
        $input.style.height = `${$input.scrollHeight}px`;
    }

    cardBodyInputEventHandler($cardBody) {
        this.adjustInputHeight($cardBody);
    }

    registerBtnClickEventHandler(e) {
        if (e.target.classList.contains("inactive")) {
            return;
        }

        const cardData = {
            title: this.$cardTitle.value.replace(/\n/g, "<br>"),
            body: this.$cardBody.value.replace(/\n/g, "<br>"),
            caption: "author by web",
        };
        this.passedEventHandler.addCard(cardData);
        this.passedEventHandler.removeRegisterCard();
    }

    toggleRegisterBtn(booleanValue) {
        if (booleanValue) {
            this.$registerBtn.classList.replace("inactive", "active");
        } else {
            this.$registerBtn.classList.replace("active", "inactive");
        }
    }

    cardTitleInputEventHandler($cardTitle) {
        const cardTitle = $cardTitle.value;
        this.toggleRegisterBtn(cardTitle);
        this.adjustInputHeight($cardTitle);
    }

    template() {
        return `<div class="schedule-register-card">
                <form class="schedule-register-card__text-container">
                    <textarea 
                        class="schedule-register-card__title"  
                        placeholder="제목을 입력하세요"
                        rows="1"
                        maxLength="${TEXT_LENGTH_LIMIT}"
                    ></textarea>
                    <textarea 
                        class="schedule-register-card__body" 
                        placeholder="내용을 입력하세요"
                        rows="1"
                        maxLength="${TEXT_LENGTH_LIMIT}"
                    ></textarea>
                </form>
                <div class="schedule-register-card__btns-container">
                    <button class="schedule-register-card__cancel-btn">
                        취소
                    </button>
                    <button class="schedule-register-card__register-btn inactive">
                        등록
                    </button>
                </div>
            </div>`;
    }
}
