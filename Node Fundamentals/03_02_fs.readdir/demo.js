var fs = require('fs')

//file sys to read/access DIR(1st param= location of DIR, 2nd param= CB(err, data) =>)
fs.readdir('c:/', (err, data) => {
    console.log(data) //CLI returns DIR in drive C:
})