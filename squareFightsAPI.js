const express = require("express");
const { Mutex } = require("async-mutex");
const app = express();
app.use(express.text());
const port = 3000;

let servidoresDisponibles = [];

// Salas
for (let i = 1; i <= 10000; i++) {
    servidoresDisponibles.push(i);
}

const mutex = new Mutex();

app.get('/joinRoom', async (res) => {

    let sala = -1;

    //inicio sección crítica
    const release = await mutex.acquire();

    if (servidoresDisponibles.length > 0) sala = servidoresDisponibles.pop();

    release();
    // final seccion crítica

    if (sala === -1) return res.sendStatus(503); 
    return res.send(sala);
});

app.listen(port);
