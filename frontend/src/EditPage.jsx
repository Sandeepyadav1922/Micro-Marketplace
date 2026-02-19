import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditPage() {
  const token = localStorage.getItem("token")
  let { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  let productValidation = () => {
    let newError = {};
    if (!product.title.trim()) {
      newError.title = "Product title is required";
    }
    if (!product.description.trim()) {
      newError.description = "Please Provide description";
    }
    if (!product.image.trim()) {
      newError.image = "Product Url is required";
    }
    if (!product.price) {
      newError.price = "Product price is required";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    const {owner, reviews, _id, __v, ...updateProduct } = product;
    e.preventDefault();
    if (!productValidation()) return;

    try {
      let res = await axios.put(
        `http://localhost:8080/products/${id}`,
        updateProduct,
        { headers: { Authorization: token } },
      );
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/products");
      }, 100);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response);
    }
  };

  const handleChange = (e) => {
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
            Upload Image Url
          </label>
          <input
            type="text"
            name="image"
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
            value={product.price}
            onChange={handleChange}
            className="form-control"
            id="price"
          />
          {error.price && <div style={{ color: "red" }}>{error.price}</div>}
        </div>
        <br />
      </div>
      <div className="offset-1 offset-md-2 offset-lg-3">
        <Link to={"/products"}>
          <button type="button" className="btn btn-outline-warning">
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
        </Link>
        <button type="submit" className="btn btn-outline-primary m-4">
          Update
        </button>
      </div>
      </div>
    </form>
  );
}

export default EditPage;
