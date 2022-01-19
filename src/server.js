const app = require('./index');

const connect = require('./configs/db');

app.listen(3346,async()=>{
     await connect();
    console.log('listening on port 3344');
})