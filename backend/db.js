const mongoose = require('mongoose')

async function main() {
    try {
    await mongoose.connect('mongodb+srv://tanishq:gnKvDzp3QjQLhl6W@cluster0.t3phd.mongodb.net/paytm')
    console.log("DB connected")
    }
    catch(err) {
        console.log("Error occurred while conection to DB", err)
    }
}

main()

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    }, 
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50 
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50 
    },
})

const User = mongoose.model('User', userSchema)

module.exports = {User}