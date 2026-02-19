import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "./NewPage.css";

function NewPage() {
  const token = localStorage.getItem("token");
  let [error, setError] = useState({});
  let [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  let validateProduct = () => {
    let newError = {};
    if (!product.title.trim()) {
      newError.title = "Product Title is required";
    }

    if (!product.description.trim()) {
      newError.description = "Product Description is required";
    }

    if (!product.image) {
      newError.image = "Product Url is required";
    }

    if (!product.price) {
      newError.price = "Proiduct Price is required";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  let navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();

    if (!validateProduct()) return;

    axios
      .post("http://localhost:8080/products", product, {
        headers: { Authorization: token },
      })
      .then(() => {
        setProduct({
          title: "",
          description: "",
          image: "",
          price: "",
        });
        toast.success("Created Successfully");
        navigate("/products");
      })
      .catch((err) => {
          toast.error(err.response.data.message);
        console.log(err.response);
      });
  };

  let handleChange = (e) => {
    setProduct((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
      <div className="row mt-5">
        <div className="mb-3 col-lg-6 col-md-8 col-10 offset-lg-3 offset-md-2 offset-1">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Please Enter Product title"
            value={product.title}
            onChange={handleChange}
            className="form-control"
            id="title"
          />
          {error.title && <div style={{ color: "red" }}>{error.title}</div>}
        </div>
        <div className="mb-3 col-lg-6 col-md-8 col-10 offset-lg-3 offset-md-2 offset-1">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <textarea
            type="text"
            name="description"
            placeholder="Enter Your Description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
            id="description"
          />
          {error.description && (
            <div style={{ color: "red" }}>{error.description}</div>
          )}
        </div>
        <div className="mb-3 col-lg-6 col-md-8 col-10 offset-lg-3 offset-md-2 offset-1">
          <label htmlFor="image" className="form-label">
            Product URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Please Provide Url"
            onChange={handleChange}
            value={product.image}
            className="form-control"
            id="image"
          />
          {error.image && <div style={{ color: "red" }}>{error.image}</div>}
        </div>
        <div className="mb-3 col-lg-6 col-md-8 col-10 offset-lg-3 offset-md-2 offset-1">
          <label htmlFor="price" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter Product Price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
            id="price"
          />
          {error.price && <div style={{ color: "red" }}>{error.price}</div>}
        </div>
        <br />
        {/* </div> */}
      </div>
      <div className="offset-1 offset-md-2 offset-lg-3">
        <Link to={"/products"}>
          <button type="button" className="btn btn-outline-warning">
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
        </Link>
        <button type="submit" className="btn btn-outline-primary m-4">
          Submit
        </button>
      </div>
      </div>
    </form>
  );
}

export default NewPage;
