const pool = require('../config/db');

const State = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM state order by id ASC');
        return result.rows;
    },
    add: async (data) => {
        const { country_id, state_name } = data;
        console.log(country_id,state_name);
        const result = await pool.query(
            'INSERT into state (country_id,state_name) VALUES ($1,$2) ',
            [country_id,state_name]
        );
        return result.rows[0];
    },
    update: async (id,data) => {
        const result = await pool.query(
            'UPDATE state SET country_id = $1, state_name = $2 WHERE id = $3',
            [data.country_id,data.state_name,id]
        );
        return result.rows[0];
    },
    delete: async (id) => {
        await pool.query('DELETE FROM state WHERE id = $1', [id]);
    },
};

module.exports = State;