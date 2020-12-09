let num = 0;

let registerSW = () => {
    // This is the service worker with the Cache-first network

    // Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

    // Check compatibility for the browser we're running this in
    if ("serviceWorker" in navigator) {
        let serviceWorkerFileName = 'serviceWorker.js';
        if (navigator.serviceWorker.controller && navigator.serviceWorker.controller.scriptURL === self.location.href + serviceWorkerFileName) {
            console.log("Active service worker found, no need to register", navigator.serviceWorker.controller);
        } else {
            // Register the service worker
            navigator.serviceWorker
                .register(serviceWorkerFileName)
                .then(function (reg) {
                    console.log("Service worker has been registered: ", reg);
                })
                .catch(function (err) {
                    console.log('Service Worker Registeration error: ', err);
                });
        }
    }
}

window.onload = () => {
    registerSW();
    let hexBtnHolder = document.getElementsByClassName("btn-holder");
    hexBtnHolder[0].onclick = () => {
        num++;
        sendMsgToSW({ value: num });
    }
    navigator.serviceWorker.addEventListener('message', event => {
        num = event.data.value;
        increasePoint(num);
        // console.log(event.data.value);
    });
}

const sendMsgToSW = (data = { msg: "hello" }) => {
    navigator.serviceWorker.controller.postMessage(data);
}

const increasePoint = (num = 0) => {
    document.getElementById("point").innerText = num;

    /* animation stuff */
    createPlusOneAnimation();
}

const createPlusOneAnimation = () => {
    let div = document.createElement("div");

    //fill text and location
    let hexBtn = btn.getBoundingClientRect();
    let x =
        hexBtn.left +
        hexBtn.width / 2 +
        Math.pow(-1, num % 2) * ((Math.random() * hexBtn.width) / 2);
    let y = hexBtn.top - Math.random() * 30;

    div.innerText = "+1";
    div.style.top = y + "px";
    div.style.left = x + "px";

    div.classList.add("anim");
    document.body.appendChild(div);

    //add event listener that will delete the div once the animation ends
    div.addEventListener("animationend", () => {
        div.parentNode.removeChild(div);
    });
}