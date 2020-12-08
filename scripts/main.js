if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let sw = await navigator.serviceWorker.register("../serviceWorker.js");
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', sw.scope);
        } catch (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }
    });

    navigator.serviceWorker.addEventListener('message', event => {
        console.log(event.data.value);
        document.getElementById("data").innerText = event.data.value;
    });
}

let data = 0;
window.onload = () => {
    document.getElementById("btn").onclick = () => {
        ++data;
        document.getElementById("data").innerText = data;
        navigator.serviceWorker.controller.postMessage({
            value: data
        });
    }
}




