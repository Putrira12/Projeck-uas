// TODO 5: SETUP MODEL
const db = require("../config/database.js");

class Patient{
    static tableName = 'patients';
    static tableJoin = 'status_patient';

    static all() {
        const sql = `SELECT
        ${this.tableName}.id,
        ${this.tableName}.name,
        ${this.tableName}.phone,
        ${this.tableName}.address,
        ${this.tableJoin}.status,
        DATE_FORMAT(${this.tableName}.in_date_at,"%d-%m-%Y") as in_date_at,
        DATE_FORMAT(${this.tableName}.out_date_at,"%d-%m-%Y") as out_date_at
        FROM ${this.tableName} 
        LEFT JOIN ${this.tableJoin} ON ${this.tableName}.status_id = ${this.tableJoin}.id`;
        return Patient.query(sql, null, (result) => result);
    }

    static async find(id) {
        const sql = `SELECT 
        ${this.tableName}.id,
        ${this.tableName}.name,
        ${this.tableName}.phone,
        ${this.tableName}.address,
        ${this.tableJoin}.status,
        DATE_FORMAT(${this.tableName}.in_date_at,"%d-%m-%Y") as in_date_at,
        DATE_FORMAT(${this.tableName}.out_date_at,"%d-%m-%Y") as out_date_at
        FROM ${this.tableName} 
        LEFT JOIN ${this.tableJoin} ON ${this.tableName}.status_id = ${this.tableJoin}.id
        WHERE ${this.tableName}.id = ?`;
        return await Patient.query(sql, id, (result) => result);
    }

    static async create(body) {
        const sql = `INSERT INTO ${this.tableName} SET ?`;
        const id = await Patient.query(sql, body, (result) => result.insertId);
        
        return Patient.find(id);
    }

    static async update(id, body) {
        const sql = `UPDATE ${this.tableName} SET ? WHERE id = ?`
        await Patient.query(sql, [body, id], (result) => result); 

        return Patient.find(id);
    }

    static delete(id){
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        return Patient.query(sql, id, (result) => result);
    }

    static async search(name) {
        const sql = `SELECT 
        ${this.tableName}.id,
        ${this.tableName}.name,
        ${this.tableName}.phone,
        ${this.tableName}.address,
        ${this.tableJoin}.status,
        DATE_FORMAT(${this.tableName}.in_date_at,"%d-%m-%Y") as in_date_at,
        DATE_FORMAT(${this.tableName}.out_date_at,"%d-%m-%Y") as out_date_at
        FROM ${this.tableName} 
        LEFT JOIN ${this.tableJoin} ON ${this.tableName}.status_id = ${this.tableJoin}.id
        WHERE ${this.tableName}.name LIKE '%` + name + `%'`;
        return await Patient.query(sql, name, (result) => result);
    }

    static async findByStatus(status) {
        const sql = `SELECT 
        ${this.tableName}.id,
        ${this.tableName}.name,
        ${this.tableName}.phone,
        ${this.tableName}.address,
        ${this.tableJoin}.status,
        DATE_FORMAT(${this.tableName}.in_date_at,"%d-%m-%Y") as in_date_at,
        DATE_FORMAT(${this.tableName}.out_date_at,"%d-%m-%Y") as out_date_at
        FROM ${this.tableName} 
        LEFT JOIN ${this.tableJoin} ON ${this.tableName}.status_id = ${this.tableJoin}.id
        WHERE ${this.tableJoin}.status = ?`;
        return await Patient.query(sql, status, (result) => result);
    }

    static query(sql, body, callback) {
        return new Promise((resolved, reject) => {
            db.query(sql, body, (err, results) => {
                resolved(callback(results));
            });
        });
    }
}

module.exports = Patient;