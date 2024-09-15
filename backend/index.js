const express = require("express");
const cors = require("cors")

const router = require("./routes/index")

const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/v1', router)



app.listen(3000, (err) => {
    console.log("App running on port 3000")
})

