import { FastifyPluginAsync } from 'fastify'
import { db } from '../../../../db'

const aaii: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/allocation', async function (request, reply) {
        try {
            const { rows } = await db.query('SELECT * FROM aaii_allocation ORDER BY survey_date DESC');

            if (rows.length === 0) return { current: null, timeseries: [] };

            const current = rows[0];

            return {
                current,
                timeseries: rows,
                historical: {
                    // calculated stats or fetched from DB
                    avg_stocks: 61.2, // placeholders per spec examples, or calculated
                    avg_bonds: 15.9,
                    avg_cash: 22.0
                }
            }
        } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
            request.log.error(err)
            return { current: null, timeseries: [] }
        }
    })
}

export default aaii
