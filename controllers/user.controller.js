require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const { getUsersDB, createUserDB, getUserDB, createAccountDB, updateAccountDB, deleteUserDB, getAccountsDB } = require("../database/db");

// GETUSERS TRAER A TODOS LOS USUARIOS
const getUsers = async(req, res) => {
    const response = await getUsersDB()
        if(!response.ok){
            return res.status(500).json({ok: false, msg: response.msg})
        }
    return res.json({ok: true, users: response.users})
}

// GETACCOUNTS TRAER A TODAS LAS CUENTAS
const getAccounts = async(req, res) => {
    const response = await getAccountsDB()
        if(!response.ok){
            return res.status(500).json({ok: false, msg: response.msg})
        }
    return res.json({ok: true, accounts: response.accounts})
}

// CREATEUSER CREAR UN USUARIO
const createUser = async(req, res) => {
    try {
        const {email, password, re_password} = req.body
            if(!email || !password || !re_password){
                throw new Error("Algunos campos estan vacios")
            }

        if(password != re_password){
            throw new Error("Contraseñas desiguales")
        }

        // ENCRIPTAR CONTRASEÑA
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const response = await createUserDB({email, hashPassword})
            if(!response.ok){
                throw new Error(response.msg)
            }

        // TOKEN
        const payload = {id:response.id_usuario}
        const token = jwt.sign(payload, process.env.JWT_SECRET)
            return res.json({
                ok: true,
                token,
                payload
            })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }
}

// LOGINUSER INGRESO DEL USUARIO A LA PLATAFORMA
const loginUser = async(req, res) => {

    try {
        const {email, password} = req.body
        if(!email || !password){
            throw new Error("Algunos campos estan vacios")
        }

        const response = await getUserDB(email)
            if(!response.ok){
                throw new Error(response.msg)
            }

        if(!response.user){
            throw new Error("No existe el email en el registro")
        }

        const {user} = response
        const comparePassword = await bcrypt.compare(password, user.password)
            if(!comparePassword){
                throw new Error("Contraseña incorrecta")
            }

        const payload = {id:user.id_usuario}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})

        return res.json({
            ok: true,
            token,
            payload
        })
    } catch (error) {
        return res.status(400).json({ok: false, msg: error.message})
    }
}

// CREATEACCOUNT CREAR UNA CUENTA
const createAccount = async(req, res) => {
    try {
        const {id_usuario, nombre, plataforma, nivel, rango_br, rango_ar} = req.body
        const response = await createAccountDB({id_usuario, nombre, plataforma, nivel, rango_br, rango_ar})

        if(!response.ok){
            throw new Error(response.msg)
        }
        return res.json(response)

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message,
          })
    }
}

//UPDATEACCOUNT ACTUALIZAR INFO DE LA CUENTA
const updateAccount = async(req, res) => {
    const {id_usuario, nivel, rango_br, rango_ar, leyenda, arma, mapa} = req.body
    const response = await updateAccountDB(id_usuario, nivel, rango_br, rango_ar, leyenda, arma, mapa)
    return res.json(response)
}

//DELETEUSER ELIMINAR AL USUARIO
const deleteUser = async(req, res) => {
    const {id_usuario} = req.body
    const response = await deleteUserDB(id_usuario)
    return res.json(response)
}

module.exports = {
    getUsers,
    getAccounts,
    createUser,
    loginUser,
    createAccount,
    updateAccount,
    deleteUser
}