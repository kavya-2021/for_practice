const app = require('./index');

const connect = require('./configs/db');

app.listen(3348,async()=>{
     await connect();
    console.log('listening on port 3348');
})