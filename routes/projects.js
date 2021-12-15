const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../connection/connection.json")

router.post("/post", async (req, res)=>{
    let project = req.body.project;
    try {
        const conect = await mysql.createConnection(database);
        conect.execute("INSERT INTO projects (project, finished) VALUES (?, ?)", [project, 0]);
        conect.end();
        let data = {
            title: "Great project to do!"
        }
        return res.status(200).send(data)
    } catch (error) {
        console.log(error)
        let data = {
            title: "Error on submiting the project!"
        }
        return res.status(500).send(data)
    }
})

router.get("/get", async (req, res)=>{
    try {
        const conect = await mysql.createConnection(database);
        const [rows] = await conect.execute("SELECT project FROM projects WHERE finished = 0", []);

        return res.status(200).send(rows)
    } catch (error) {
        console.log(error)
        let data = {
            title: "Error on submiting the project!"
        }
        return res.status(500).send(data)
    }
})

router.get("/get/one", async (req, res)=>{
    const conect = await mysql.createConnection(database);
    const [num] = await conect.execute("SELECT id FROM projects WHERE finished = 0", []);
    
    const rand = Math.floor(Math.random() * num.length);
    const id = num[rand].id;
    try {
        const conect = await mysql.createConnection(database);
        const [rows] = await conect.execute("SELECT project FROM projects WHERE id = ? AND finished = 0", [id]);
        return res.status(200).send(rows)
    } catch (error) {
        console.log(error)
        let data = {
            title: "Error on getting a project!"
        }
        return res.status(500).send(data);
    }
})

router.put("/update/:project", async (req,res)=>{
    try {
        const conect = await mysql.createConnection(database);
        await conect.execute("UPDATE projects SET finished = ? WHERE project = ?", [req.body.finished, req.params.project]);

        let data = {
            title: "Good Job! You finished a project"
        }
        return res.status(200).send(data)
    } catch (error) {
        console.log(error)
        let data = {
            title: "Error on submiting the project!"
        }
        return res.status(500).send(data)
    }
})

module.exports = router