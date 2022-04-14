const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
};

export const getId = () => {
    const tokens = uuid().split("-");
    return tokens[2];
};

export const TEXT_LENGTH_LIMIT = 500;

export const doubleClickEventHandler = (eventHandler) => {
    let clickCount = 0;
    let timerId;

    return function ({ target }) {
        clickCount += 1;
        if (clickCount === 1) {
            timerId = setTimeout(() => {
                clickCount = 0;
            }, 300);
        } else if (clickCount === 2) {
            clearTimeout(timerId);
            clickCount = 0;

            eventHandler.call(this, target);
        }
    };
};

export const request2Server = async (url, method = "GET", cardData = {}) => {
    switch (method) {
        case "GET": {
            const response = await fetch(url);
            const responseObj = await response.json();
            return responseObj;
        }
        case "DELETE": {
            await fetch(url, { method })
                .catch(error => console.error(error));
            console.log('delete 요청')
            return;
        }
        case "POST": {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cardData),
            })
                .catch(error => console.error(error));
            console.log('post요청')
            return;
        }
    }
};
