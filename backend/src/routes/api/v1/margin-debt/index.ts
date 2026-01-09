import { FastifyPluginAsync } from 'fastify'
import { db } from '../../../../db'

const marginDebt: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        // Spec: Query: { period: '2Y'|... }
        // Returns: { current: {...}, timeseries: [...], thresholds: {...} }

        try {
            const { rows } = await db.query('SELECT * FROM margin_debt ORDER BY month DESC');

            if (rows.length === 0) return { current: null, timeseries: [] };

            const current = rows[0];
            const timeseries = rows; // Filter by period if implemented

            return {
                current,
                timeseries,
                thresholds: {
                    euphoria: 30,
                    capitulation: -30
                }
            }
        } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
            request.log.error(err)
            return { current: null, timeseries: [] }
        }
    })
}

export default marginDebt
