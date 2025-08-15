import { Hono } from 'hono'

const r = new Hono()

r.get('/', (c) => c.json({ ok: true, service: 'hono', ts: Date.now() }))

export default r
