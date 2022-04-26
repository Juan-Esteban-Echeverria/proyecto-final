const express = require("express")
const { getUsers, createUser, loginUser, createAccount, updateAccount, deleteUser, getAccounts } = require("../controllers/user.controller")
const router = express.Router()

router.get("/users", getUsers)
router.get("/accounts", getAccounts)
router.post("/users",createUser)
router.post("/login", loginUser)
router.post("/accounts/:id", createAccount)
router.put("/accounts/:id", updateAccount)
router.delete("/users/:id", deleteUser)

module.exports = router