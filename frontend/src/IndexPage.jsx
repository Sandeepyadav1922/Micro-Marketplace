import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./IndexPage.css";

function IndexPage() {
    let [products, setProducts] = useState([]);
      const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:8080/products", {headers: {
          Authorization: token
        }})
        .then((res) => setProducts(res.data))
        .catch((err) => {
          toast.error(err.response.data);
          console.log(err);
        });
    }, []);

    return (
        <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 index-container">
      {products.map((product) => (
        <div className="card col" key={product._id} >
          <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
            style={{height: "20rem"}}
          />
          <div className="card-img-overlay"></div>
          </Link>
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
          </div>
        </div>
      ))}
    </div>
    );
}

export default IndexPage;