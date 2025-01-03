const express = require("express");
const app = express();
app.use(express.json());


let currentWord = "";


app.post("/send", (req,res) =>{
    const {word} = req.body;
    if(!word) return res.status(400).json({error: "No se ha recibido una palabra"});
    currentWord = word;
    return res.status(200).json({message: "Palabra recibida"})
});


app.get("/receive", (req,res) =>{
    if(!currentWord) return res.status(400).json({error: "No existe la palabra"});
    return res.status(200).json({word:currentWord})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));