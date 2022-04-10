class ScheduleDeleteConfirm {
    constructor() {
        this.$deleteConfirm;
    }

    init({ $scheduleCard, passedEventHandler }) {
        passedEventHandler.toggleScheduleCardActiveRed()

        this.render();
        this.setDOMElement();
        this.setEvent($scheduleCard, passedEventHandler);
    }

    render() {
        const scheduleDeleteConfirmTemplate = this.template();
        document.body.insertAdjacentHTML(
            "beforeend",
            scheduleDeleteConfirmTemplate
        );
    }

    setDOMElement() {
        this.$deleteConfirm = document.querySelector(".dim-layer");
    }

    setEvent($scheduleCard, passedEventHandler) {
        this.$deleteConfirm.addEventListener('click', (e) => this.confirmClickEventHandler(e, $scheduleCard, passedEventHandler))
    }

    confirmClickEventHandler(event, $scheduleCard, passedEventHandler) {
        if(event.target.classList.contains("schedule-delete-confirm__cancel-btn")) {
            this.cancelBtnClickEventHandler(passedEventHandler)
        }
        if(event.target.classList.contains("schedule-delete-confirm__delete-btn")) {
            this.deleteBtnClickEventHandler($scheduleCard, passedEventHandler)
        }
    }

    deleteBtnClickEventHandler($scheduleCard, passedEventHandler) {
        this.removeDeleteConfirm();
        passedEventHandler.removeCard($scheduleCard)
    }

    cancelBtnClickEventHandler(passedEventHandler) {
        passedEventHandler.toggleScheduleCardActiveRed()
        this.removeDeleteConfirm();
    }

    removeDeleteConfirm() {
        this.$deleteConfirm.remove();
    }

    template() {
        return `<div class="dim-layer">
        <div class="schedule-delete-confirm">
            <p>선택한 카드를 삭제할까요?</p>
            <div class="schedule-delete-confirm__btns-container">
                <button class="schedule-delete-confirm__cancel-btn">
                    취소
                </button>
                <button class="schedule-delete-confirm__delete-btn">
                    삭제
                </button>
            </div>
        </div>
    </div>`;
    }
}

export const scheduleDeleteConfirm = new ScheduleDeleteConfirm()