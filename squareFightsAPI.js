const express = require("express");
const app = express();
app.use(express.json());


let currentWord = "";


app.post("/send", (req,res) =>{
    const word = req.body;
    if(!word) return res.status(404).send("No hay palabra");
    currentWord = word;
    return res.status(200).send("Palabra recibida")
});


app.get("/receive", (req,res) =>{
    if(!currentWord) return res.status(404).send("No word available")
    return res.status(200).send(currentWord)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));