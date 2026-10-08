const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017/");

let db;

async function startServer() {
    try {
        await client.connect();

        db = client.db("myDatabase");

        console.log("MongoDB connected");

        app.listen(5070, () => {
            console.log("Server running on port 5070");
        });

    } catch (error) {
        console.log(error);
    }
}

startServer();

app.get("/api/products", async (req, res) => {
    try {
        const products = await db
            .collection("products")
            .find()
            .toArray();

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        const result = await db
            .collection("products")
            .insertOne(req.body);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error adding product" });
    }
});

app.put("/api/products/:id", async (req, res) => {
    try {
        await db.collection("products").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.json({ message: "Product updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating product" });
    }
});

app.delete("/api/products/:id", async (req, res) => {
    try {
        await db.collection("products").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
});

app.get("/api/orders", async (req, res) => {
    try {
        const orders = await db
            .collection("orders")
            .find()
            .toArray();

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

app.post("/api/orders", async (req, res) => {
    try {
        const result = await db
            .collection("orders")
            .insertOne(req.body);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error adding order" });
    }
});

app.put("/api/orders/:id", async (req, res) => {
    try {
        await db.collection("orders").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.json({ message: "Order updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating order" });
    }
});

app.delete("/api/orders/:id", async (req, res) => {
    try {
        await db.collection("orders").deleteOne({
            _id: new ObjectId(req.params.id)
        });

        res.json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order" });
    }
});