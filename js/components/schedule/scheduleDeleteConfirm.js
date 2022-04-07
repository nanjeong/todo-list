export class ScheduleDeleteConfirm {
    constructor({ target, passedEventHandler }) {
        this.$target = target;
        this.passedEventHandler = passedEventHandler;
        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const scheduleDeleteConfirmTemplate = this.template();
        document.body.insertAdjacentHTML(
            "beforeend",
            scheduleDeleteConfirmTemplate
        );
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
