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

// RUTA PARA LOGIN ADMINISTRATIVO
app.post("/login", (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            ok: false,
            mensaje: "Correo y contrasena son obligatorios"
        });
    }

    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ? LIMIT 1";

    db.query(sql, [correo, password], (err, results) => {
        if (err) {
            console.error("Error SQL en login:", err);
            return res.status(500).json({
                ok: false,
                mensaje: "Error en servidor"
            });
        }

        if (results.length > 0) {
            return res.json({
                ok: true,
                mensaje: "Ingreso correcto"
            });
        }

        res.json({
            ok: false,
            mensaje: "Credenciales incorrectas"
        });
    });
});

// RUTAS CRUD PARA PRODUCTOS
app.get("/productos", (req, res) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error SQL al listar productos:", err);
            return res.status(500).send("Error al obtener productos");
        }
        res.json(results);
    });
});

app.post("/productos", (req, res) => {
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;

    if (!nombre || !descripcion || precio == null || !categoria || stock == null || !imagen) {
        return res.status(400).send("Faltan datos obligatorios para registrar el producto");
    }

    const sql = "INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombre, descripcion, precio, categoria, stock, imagen], (err, result) => {
        if (err) {
            console.error("Error SQL al registrar producto:", err);
            return res.status(500).send("Error al guardar el producto");
        }
        res.status(201).json({ mensaje: "Producto registrado correctamente", id: result.insertId });
    });
});

app.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, stock, imagen } = req.body;

    if (!nombre || !descripcion || precio == null || !categoria || stock == null || !imagen) {
        return res.status(400).send("Faltan datos obligatorios para actualizar el producto");
    }

    const sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, stock = ?, imagen = ? WHERE id = ?";
    db.query(sql, [nombre, descripcion, precio, categoria, stock, imagen, id], (err, result) => {
        if (err) {
            console.error("Error SQL al actualizar producto:", err);
            return res.status(500).send("Error al actualizar el producto");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Producto no encontrado");
        }
        res.json({ mensaje: "Producto actualizado correctamente" });
    });
});

app.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error SQL al eliminar producto:", err);
            return res.status(500).send("Error al eliminar el producto");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Producto no encontrado");
        }
        res.json({ mensaje: "Producto eliminado correctamente" });
    });
});

// Iniciar servidor
app.listen(3000,"0.0.0.0", () => {
    console.log("Servidor en http://127.0.0.1:3000");
});
