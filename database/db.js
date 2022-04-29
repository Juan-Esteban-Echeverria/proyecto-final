require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool(
    process.env.DATABASE_URL && {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
);

// TRAER A LOS USUARIOS
const getUsersDB = async() => {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT email FROM usuarios')
        return {
            ok: true,
            users: res.rows
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

// TRAER TODAS LAS CUENTAS
const getAccountsDB = async() => {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT id_usuario, nombre, plataforma, nivel, rango_br, rango_ar, leyenda, arma, mapa FROM cuenta')
        return {
            ok: true, 
            accounts: res.rows
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

// CREAR A UN USUARIO
const createUserDB = async({email, hashPassword}) => {
    const client = await pool.connect()
    const query = {
        text: 'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *',
        values: [email, hashPassword]
    }
    try {
        const res = await client.query(query)
        const {id_usuario} = res.rows[0]
        return {
            ok: true,
            id_usuario
        }
    } catch (error) {
        console.log(error)
        if(error.code === '23505'){
            return {
                ok: false,
                msg: 'Ya existe este email registrado'
            }
        }
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

// TRAER A UN SOLO USUARIO
const getUserDB = async(email) => {
    const client = await pool.connect()

    const query = {
        text: 'SELECT * FROM usuarios WHERE email = $1',
        values: [email]
    }
    try {
        const response = await client.query(query)
        return {
            ok: true,
            user: response.rows[0]
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

// CREAR UNA CUENTA
const createAccountDB = async({id_usuario, nombre, plataforma, nivel, rango_br, rango_ar}) => {
    const client = await pool.connect()
    const query = {
        text: 'INSERT INTO cuenta (id_usuario, nombre, plataforma, nivel, rango_br, rango_ar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [id_usuario, nombre, plataforma, nivel, rango_br, rango_ar]
    }
    try {
        const res = await client.query(query)
        const {id_cuenta} = res.rows[0]
        return {ok: true,
            id_cuenta
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

// ACTUALIZAR ESTADISTICAS DE LA CUENTA
const updateAccountDB = async(id_usuario, nivel, rango_br, rango_ar, leyenda, arma, mapa) => {
    const client = await pool.connect()

    const query = {
        text: 'UPDATE cuenta SET nivel = $2, rango_br = $3, rango_ar = $4, leyenda = $5, arma = $6, mapa = $7 WHERE id_usuario = $1',
        values: [id_usuario, nivel, rango_br, rango_ar, leyenda, arma, mapa]
    }
    try {
        const response = await client.query(query)
        return response.rows
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

// ELIMINAR USUARIO
const deleteUserDB = async(id_usuario) => {
    const client = await pool.connect()

    const query = {
        text: 'DELETE FROM cuenta WHERE id_usuario = $1 RETURNING*',
        values: [id_usuario]
    }
    try {
        const response = await client.query(query)
        return response.rows
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: error.message
        }
    } finally {
        client.release()
    }
}

const migrate = async () => {
    try {
        const data = fs.readFileSync(__dirname + "/migracion.sql", {
            encoding: "utf-8",
        });
        await pool.query(data);
        console.log("tabla creada");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getUsersDB,
    getAccountsDB,
    getUserDB,
    createUserDB,
    createAccountDB,
    updateAccountDB,
    deleteUserDB,
    migrate,
};