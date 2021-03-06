let num = 0;
window.onload = async () => {

    if ('serviceWorker' in navigator) {
        try {
            let sw = await navigator.serviceWorker.register("serviceWorker.js", { scope: "/tabSync/" });
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', sw.scope);
        } catch (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }
        navigator.serviceWorker.addEventListener('message', event => {
            num = event.data.value;
            increasePoint(num);
            // console.log(event.data.value);
        });
    }

    let hexBtnHolder = document.getElementsByClassName("btn-holder");
    hexBtnHolder[0].onclick = () => {
        num++;
        sendMsgToSW({ value: num });
    }

}
const sendMsgToSW = (data = { msg: "hello" }) => {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(data);
    } else {
        window.location.reload();
    }

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