const pool = require('../config/db');

const Country = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM country order by id ASC ');
        return result.rows;
    },
    add : async (data) => {
        const result = await pool.query(
            'INSERT INTO country (country_name) VALUES ($1)',
            [data.country]
        );
        return result.rows[0];
    },
    update: async (id,data) => {
        const result = await pool.query(
            'UPDATE country SET country_name = $1 WHERE id = $2',
            [data.country,id]
        );
        return result.rows[0];
    },
    delete: async (id) => {
        await pool.query('DELETE FROM country WHERE id = $1', [id]);
    },
};

module.exports = Country;