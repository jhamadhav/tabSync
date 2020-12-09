self.addEventListener('message', event => {
    // console.log(`[Message] event: `, event);
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                value: event.data.value
            });
        })
    })
});
