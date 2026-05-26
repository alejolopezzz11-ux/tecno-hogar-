const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Permitir comunicación con frontend
app.use(cors());
app.use(express.json());

// Configuración de conexión
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ultra-NAPO1987",
    database: "contactos_db"
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor conectado a MySQL");
});


// ✅ RUTA PARA GUARDAR DATOS
app.post("/guardar", (req, res) => {
console.log("Ruta /guardar alcanzada");
    const { nombre, correo, telefono, mensaje } = req.body;

    console.log("Datos recibidos:", req.body);

    if (!nombre || !correo || !telefono || !mensaje) {
        return res.status(400).send("Datos incompletos");
    }

    const sql = "INSERT INTO contactos (nombre, correo, telefono, mensaje) VALUES (?, ?, ?, ?)";

    db.query(sql, [nombre, correo, telefono, mensaje], (err, result) => {
        if (err) {
            console.error("Error SQL:", err);
            return res.status(500).send("Error en servidor");
        }

        console.log("Registro insertado:", result);
        res.send("Datos guardados correctamente");
    });
});


// Iniciar servidor
app.listen(3000,"0.0.0.0", () => {
    console.log("Servidor en http://127.0.0.1:3000");
});