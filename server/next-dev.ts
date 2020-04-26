import express from 'express'
import { readFileSync } from 'fs'
import { createServer } from 'https'
import next from 'next'
import { webConfig } from '../src/web-config'

const options = {
    key: readFileSync('server/.config/key.pem'),
    cert: readFileSync('server/.config/cert.pem'),
}

const nextServer = next({
    dev: true,
    dir: 'src',
})

const handle = nextServer.getRequestHandler()

nextServer.prepare().then(async () => {
    const app = express()

    app.all('*', (req, res) => {
        return handle(req, res)
    })

    createServer(options, app).listen(webConfig.port, () => {
        // if (err) throw err
        console.log(`> Ready on http://localhost:${webConfig.port}`)
    })
})
