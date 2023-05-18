const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

app.use(cors("*"))
app.use(morgan('tiny'))
app.get('/', (req, res) => {
  res.send("Api is running")
})

const PORT = process.env.PORT || 8564

app.listen(PORT, (req, res) => {
  console.log(`Listening on PORT: ${PORT}`);
})