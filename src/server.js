import express from 'express'
import cors from 'cors'
import motosRouter from '../src/routers/motos.router.js'
import companiesRouter from './routers/companies.router.js'
import customersRouter from '../src/routers/customers.router.js'
import reservesRouter from '../src/routers/reserves.router.js'
import featuresRouter from '../src/routers/features.router.js'
import routesRouter from '../src/routers/routes.router.js'
import reactionsRouter from './routers/reactions.router.js'
import handlerErrors from './middlewares/handleError.js'
import authRouter from './routers/auth.router.js'
import homeRouter from './routers/home.router.js'

const server = express()

// middlewares
server.use(express.json())
server.use(cors())

// routes
server.use('/', homeRouter)
server.use('/motos', motosRouter)
server.use('/customers', customersRouter)
server.use('/companies', companiesRouter)
server.use('/reserves', reservesRouter)
server.use('/features', featuresRouter)
server.use('/routes', routesRouter)
server.use('/reactions', reactionsRouter)
server.use('/auth', authRouter)

// middleware - handleErrors
server.use(handlerErrors)

export { server }
