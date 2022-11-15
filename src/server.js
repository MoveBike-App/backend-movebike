import express from 'express'
import cors from 'cors'
import motosRouter from '../src/routers/motos.router.js'
import companiesRouter from './routers/companies.router.js'
import customersRouter from '../src/routers/customers.router.js'
import reservesRouter from '../src/routers/reserves.router.js'
import handlerErrors from './middlewares/handleError.js'
import authRouter from './routers/auth.router.js'

const server = express()

// middlewares
server.use(express.json())
server.use(cors())

// routes
server.use('/motos', motosRouter)
server.use('/customers', customersRouter)
server.use('/companies', companiesRouter)
server.use('/reserves', reservesRouter)
server.use('/auth', authRouter)

// middleware - handleErrors
server.use(handlerErrors)

export { server }
