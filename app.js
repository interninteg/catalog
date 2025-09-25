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
        let json = JSON.stringify(request.body);
        let catalogTemplate = path.resolve(__dirname, './catalog-template')
        fs.writeFile(path.join(catalogTemplate, "public/contents.json"), json, (err) => {  //write request body to a file
            if (err) {
                reply.code(500).send({ error: 'Failed to write file' });
                return;
            }
        });
        await build({
            root: catalogTemplate,    //the files vite uses to build
            base: '/foo/',
            build: {
                outDir: '../foo/'   //from root which catalaog template go back one level and create a directoy called foo and build
            }
        })
        return { done: 'idk' }
    } catch (err) {
        fastify.log.error(err)
        reply.code(500).send({ error: 'Build failed', details: err.message })
    }
})

// serving the static output of the vite build. for now it just serves the hardocded foo directory at /foo/
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'foo'),
    prefix: '/foo/',
})
// to actually serve and anser user request for the build we need to send index.html
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