import express from 'express'
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'

const port =8080;

const app =express;
const server = http.createServer(app)

server.listen(port,()=>{
    console.log('server is listening on port 8080')
})