const pool = require('../config/db');

const User = {
    getAll: async () => {
        const result = await pool.query("SELECT * ,to_char(expire_date, 'YYYY-MM-DD') AS formatted_expire_date FROM users order by id ASC");
        return result.rows;
    },
    add: async (data) => {
        
        const result = await pool.query(
            'INSERT into users (username,email,password,mobile_no,organisation,no_of_users,state,country,expire_date,photo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ',
            [data.name,data.email,data.password,data.mobile_no,data.organization,data.no_of_users,data.state,data.country,data.expire_date,data.image]
        );
        return result.rows[0];
    },
    update: async (data) => {
        if(data.image != null ){
        const result = await pool.query(
            'UPDATE users SET username =$1 ,email=$2,password=$3,mobile_no=$4,organisation=$5,no_of_users=$6,state=$7,country=$8,expire_date=$9,photo=$10 WHERE id = $11',
            [data.name,data.email,data.password,data.mobile_no,data.organization,data.no_of_users,data.state,data.country,data.expire_date,data.image,data.id]
        );
        return result.rows[0];
    }else{
        const result = await pool.query(
            'UPDATE users SET username =$1 ,email=$2,password=$3,mobile_no=$4,organisation=$5,no_of_users=$6,state=$7,country=$8,expire_date=$9 WHERE id = $10',
            [data.name,data.email,data.password,data.mobile_no,data.organization,data.no_of_users,data.state,data.country,data.expire_date,data.id]
        );
        return result.rows[0];
    }
        
    },
    delete: async (id) => {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
    },
};

module.exports = User;