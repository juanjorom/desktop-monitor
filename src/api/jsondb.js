const fs = require('fs')
const json= '@/assets/docs/data'

export default {
    writeUser(user){
        fs.writeFileSync(json, user, function(err){
            if(err) throw err
            console.log(user)
        })
    }
}