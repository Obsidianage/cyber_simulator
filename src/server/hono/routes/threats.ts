// src/server/hono/routes/threats.ts
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import type { D1Database } from '@cloudflare/workers-types'

const r = new Hono<{ Bindings: { DB: D1Database } }>()

r.get('/', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM threats').all()
  return c.json(results)
})

const ingestSchema = z.object({
  source: z.string(),
  ioc: z.string(),
  type: z.enum(['malware', 'phishing', 'ransomware', 'bruteforce']).optional(),
  observedAt: z.string().datetime().optional(),
})

r.post('/', zValidator('json', ingestSchema), async (c) => {
  const data = c.req.valid('json')
  await c.env.DB.prepare(
    'INSERT INTO threats (source, ioc, type, observedAt) VALUES (?, ?, ?, ?)'
  ).bind(data.source, data.ioc, data.type, data.observedAt).run()
  return c.json({ success: true })
})

r.delete('/:id', async (c) => {
  const id = c.req.param('id')
  await c.env.DB.prepare('DELETE FROM threats WHERE id = ?').bind(id).run()
  return c.json({ message: 'Threat deleted successfully' })
})

export default r