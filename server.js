const express = require('express');
const path = require('path')

const app = express();
const PORT = 3001;

app.use(express.static('files'))

app.get('/',(req,res) =>
res.send('Navigate')
);


app.listen(PORT,() =>
console.log(`app listening at http://localhost:${PORT}`)
);



console.log('creating API')
