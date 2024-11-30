const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
app.use(express.static(path.join(_dirname,'public')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(_dirname,'public','index.html'));
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
