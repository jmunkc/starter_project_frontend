export function encode(str) {
    let encoded = "" + str
    encoded = encoded.replace(/&/g, "&amp;");
    encoded = encoded.replace(/>/g, "&gt;");
    encoded = encoded.replace(/</g, "&lt;");
    encoded = encoded.replace(/"/g, "&quot;");
    encoded = encoded.replace(/'/g, "&#039;");
    return encoded;
}

export function setActive(newActive) {
    const linkDivs = document.getElementById("menu").querySelectorAll("a")
    linkDivs.forEach(div => {
        div.classList.remove("active")
    })
    if (newActive) {
        newActive.classList.add("active")
    }
}

export function renderTemplate(id) {
    const temp = document.querySelector(`[data-id=${id}]`)
    if (!temp) {
        return console.error(`No Template found for '${id}' `)
    }
    const clon = temp.content.cloneNode(true);
    document.getElementById("content").innerHTML = ""
    document.getElementById("content").appendChild(clon)
}

const clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
});

export function showPage(pageId) {
    document.getElementById(pageId).dispatchEvent(clickEvent)
}

export function makeOptions(method, body) {
    const options = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) { //Observe how we can add new fields to an object when needed
        options.body = JSON.stringify(body);
    }
    return options;
}

export async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message)
        error.apiError = errorResponse
        throw error
    }
    return res.json()
}