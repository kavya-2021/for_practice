const app = require('./index');

const connect = require('./configs/db');

app.listen(3838,async()=>{
     await connect();
    console.log('listening on port 3838');
})