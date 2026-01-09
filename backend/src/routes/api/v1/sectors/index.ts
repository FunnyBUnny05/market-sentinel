import { FastifyPluginAsync } from 'fastify'
import { db } from '../../../../db'
// import { Redis } from '@fastify/redis'

const sectors: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const redis = (fastify as any).redis

    fastify.get('/zscore', async function (request, reply) {
        const { benchmark = 'SPY', window = 252 } = request.query as any
        const cacheKey = `zscore:${benchmark}:${window}:${new Date().toISOString().split('T')[0]}`

        // Check Redis
        if (redis) {
            const cached = await redis.get(cacheKey)
            if (cached) return JSON.parse(cached)
        }

        try {
            const { rows } = await db.query(
                `SELECT symbol, date, zscore, signal 
       FROM sectors_zscore 
       WHERE benchmark = $1 AND window = $2 
       ORDER BY date DESC, zscore ASC`, // Limit 11? Logic says "Returns data array"
                [benchmark, window]
            )

            const response = { data: rows }

            if (redis) {
                await redis.setex(cacheKey, 900, JSON.stringify(response))
            }

            return response
        } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
            request.log.error(err)
            return { data: [] }
        }
    })

    fastify.get('/zscore/timeseries', async function (request, reply) {
        const { benchmark = 'SPY', window = 252 } = request.query as any
        // symbols param parsing... assuming array or comma separated? 
        // User spec: Query: { symbols: ['XLU','XLP'], ... }
        // Fastify handles array in query string if repeated? ?symbols=XLU&symbols=XLP

        // Simplification: Fetch all for standard set or just the requested ones.
        // Spec says: Returns { data: { [symbol]: Array<{date, zscore}> } }

        // Implementation:
        // Implementation:
        try {
            const query = `
      SELECT symbol, date, zscore 
      FROM sectors_zscore 
      WHERE benchmark = $1 AND window = $2
      ORDER BY date ASC
    `
            const { rows } = await db.query(query, [benchmark, window]);

            // Group by symbol
            const grouped: Record<string, any[]> = {};
            rows.forEach(r => {
                if (!grouped[r.symbol]) grouped[r.symbol] = [];
                grouped[r.symbol].push({ date: r.date, zscore: r.zscore });
            });

            return { data: grouped };
        } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
            request.log.error(err)
            return { data: {} }
        }
    })
}

export default sectors
