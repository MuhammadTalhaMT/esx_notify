const w = window;

// Gets the current icon it needs to use.
const types = {
    ["success"]: {
        ["icon"]: "verified",
    },
    ["error"]: {
        ["icon"]: "warning",
    },
    ["info"]: {
        ["icon"]: "notifications",
    },
};

// the color codes example `i ~r~love~s~ donuts`
const codes = {
    "~r~": "red",
    "~b~": "#378cbf",
    "~g~": "green",
    "~y~": "yellow",
    "~p~": "purple",
    "~c~": "grey",
    "~m~": "#212121",
    "~u~": "black",
    "~o~": "orange",
};

w.addEventListener("message", (event) => {
    notification({
        type: event.data.type,
        message: event.data.message,
        length: event.data.length,
    });
});

const replaceColors = (str, obj) => {
    let strToReplace = str;

    for (let id in obj) {
        strToReplace = strToReplace.replace(new RegExp(id, "g"), obj[id]);
    }

    return strToReplace;
};

notification = (data) => {
    for (color in codes) {
        if (data["message"].includes(color)) {
            let objArr = {};
            objArr[color] = `<span style="color: ${codes[color]}">`;
            objArr["~s~"] = "</span>";
            data["message"] = replaceColors(data["message"], objArr);
        }
    }

    const duration = data.length;
    const animationDuration = 500;
    
    const notification = $(`
        <div class="notify ${data.type}" style="--duration: ${duration}ms">
            <div class="innerText">
                <div class="icon-wrapper">
                    <span class="material-symbols-outlined icon">${types[data.type] ? types[data.type]["icon"] : types["info"]["icon"]}</span>
                </div>
                <div class="content">
                    <p class="text">${data["message"]}</p>
                </div>
            </div>
        </div>
    `).appendTo(`#root`);

    // Force a reflow to ensure the transition starts
    notification[0].offsetHeight;

    // Wait for the full duration before starting fade out
    setTimeout(() => {
        notification.addClass('fadeOut');
        setTimeout(() => {
            notification.remove();
        }, animationDuration);
    }, duration);

    return notification;
};
