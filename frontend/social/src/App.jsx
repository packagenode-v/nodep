import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Table from "./components/Table";
import Card from "./components/Card";

function App() {
  const [dashboard, setDashboard] = useState("customer");

  const [products, setProducts] = useState([]);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category: ""
  });

  const [editProductId, setEditProductId] = useState(null);

  const [orders, setOrders] = useState([]);

  const [orderForm, setOrderForm] = useState({
    product: "",
    quantity: "",
    customer: ""
  });

  const fetchProducts = async () => {
    const response = await fetch(
      "http://localhost:5070/api/products"
    );

    const data = await response.json();

    setProducts(data);
  };

  const fetchOrders = async () => {
    const response = await fetch(
      "http://localhost:5070/api/orders"
    );

    const data = await response.json();

    setOrders(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (editProductId) {
      await fetch(
        `http://localhost:5070/api/products/${editProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productForm)
        }
      );

      setEditProductId(null);
    } else {
      await fetch(
        "http://localhost:5070/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productForm)
        }
      );
    }

    setProductForm({
      name: "",
      price: "",
      category: ""
    });

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(
      `http://localhost:5070/api/products/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchProducts();
  };

  const editProduct = (product) => {
    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category
    });

    setEditProductId(product._id);
  };

  const handleOrderChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5070/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderForm)
    });

    setOrderForm({
      product: "",
      quantity: "",
      customer: ""
    });

    fetchOrders();
  };

  return (
    <div className="app">
      <Navbar
        dashboard={dashboard}
        setDashboard={setDashboard}
      />

      {dashboard === "customer" && (
        <div className="container">
          <h1>Customer Dashboard</h1>

          <h2>Available Products</h2>

          <div className="items">
            {products.map((product) => (
              <div className="item" key={product._id}>
                <h3>{product.name}</h3>

                <p className="price">
                  ₹{product.price}
                </p>

                <p>{product.category}</p>
              </div>
            ))}
          </div>

          <Form
            title="Place Order"
            fields={[
              "product",
              "quantity",
              "customer"
            ]}
            form={orderForm}
            setForm={setOrderForm}
            onSubmit={handleOrderSubmit}
          />
        </div>
      )}

      {dashboard === "manager" && (
        <div className="container">
          <h1>Manager Dashboard</h1>

          <div className="dashboard">
            <Card
              title="Products"
              value={products.length}
            />

            <Card
              title="Orders"
              value={orders.length}
            />
          </div>

          <Form
            title="Manage Products"
            fields={[
              "name",
              "price",
              "category"
            ]}
            form={productForm}
            setForm={setProductForm}
            onSubmit={handleProductSubmit}
            editId={editProductId}
          />

          <Table
            title="Products"
            data={products}
            fields={[
              "name",
              "price",
              "category"
            ]}
            onEdit={editProduct}
            onDelete={deleteProduct}
          />

          <Table
            title="Orders"
            data={orders}
            fields={[
              "product",
              "quantity",
              "customer"
            ]}
          />
        </div>
      )}
    </div>
  );
}

export default App;