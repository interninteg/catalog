import Fastify from 'fastify'
import { build } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
    logger: true
})

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})


fastify.post('/api/catalog/generate', async (request, reply) => {
    try {
        await build({
            root: path.resolve(__dirname, './catalog-template'),
            base: '/foo/',
            build: {
                outDir: '../foo/'
            }
        })
        return { done: 'idk' }
    } catch (err) {
        fastify.log.error(err)
        reply.code(500).send({ error: 'Build failed', details: err.message })
    }
})

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'foo'),
  prefix: '/foo/',
})

fastify.get('/foo', async (request, reply) => {
  const indexPath = path.join(__dirname, 'foo', 'index.html');
  const indexContent = await fs.promises.readFile(indexPath, 'utf-8');
  reply.type('text/html').send(indexContent);
});

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()