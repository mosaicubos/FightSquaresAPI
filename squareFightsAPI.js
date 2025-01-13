const express = require("express");
const { Mutex } = require("async-mutex");
const app = express();
app.use(express.text());

let servidoresDisponibles = [];

// Salas
for (let i = 1; i <= 10000; i++) {
    servidoresDisponibles.push(i);
}

const mutex = new Mutex();

app.get('/joinRoom', async (req, res) => {

    let sala = -1;

    //inicio sección crítica
    const release = await mutex.acquire();

    if (servidoresDisponibles.length > 0) sala = servidoresDisponibles.pop();

    release();
    // final seccion crítica

    if (sala === -1) return res.sendStatus(503); 
    return res.send(sala.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
