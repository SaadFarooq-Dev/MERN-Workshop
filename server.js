import 'dotenv/config'

import express from "express"
import cors from 'cors'
import morgan from "morgan"

import connectDB from "./src/config/db.js"
import _initializePassport from './src/config/passport.js'
import userRouter from './src/routes/api/user.js'
import authRouter from './src/routes/api/auth.js'
import postRouter from './src/routes/api/post.js'

connectDB()

const app = express()

app.use(express.json({ extended: false }))
app.use(cors("*"))
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send("Api is running")
})

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

const PORT = process.env.PORT || 8564

app.listen(PORT, (req, res) => {
  console.log(`Listening on PORT: ${PORT}`);
})
