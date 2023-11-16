import express from 'express'
import { router } from '../src/routes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3030, () => console.log('🚀 Server listening'))
