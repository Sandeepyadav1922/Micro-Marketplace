import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "./App";
import "./ShowPage.css";

function ShowPage() {
  let { currUser } = useContext(UserContext);
const token = localStorage.getItem("token");
  let [product, setProduct] = useState(null);
  let [review, setReview] = useState({
    rating: 3,
    comment: ""
  });
  let [reviewError, setReviewError] = useState({});
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        // console.log(res.data);
        }
    )
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data || "Something went wrong");
        setTimeout(() => {
          navigate("/products");
        }, 1500);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.delete(`http://localhost:8080/products/${id}`, { headers: { Authorization: token } });
      if(!currUser) {
        toast.error("You are not Logged in");
        return;
      } else {
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/products");
      }, 100);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  let reviewValidation = () => {
    let newReviewError = {}
    if(!review.rating) {
        newReviewError.rating = "Rating is required"
    }
    if(!review.comment) {
        newReviewError.comment = "Comment is required"
    }

    setReviewError(newReviewError);
    return Object.keys(newReviewError).length === 0;
  }

  const handleReviewSubmit = (e) => {
        e.preventDefault();
        if(!reviewValidation()) return;
        axios.post(`http://localhost:8080/products/${id}/review`, review, {headers: {Authorization: token}})
        .then((res) => {
          if(!currUser) {
            toast.error("Must be Logged In");
            return
          } else {
        setProduct((prev) => ({
            ...prev,
            reviews: [...(prev.reviews || []), res.data.review]
        }))
        setReview({
            rating: "",
            comment: ""
        })
        console.log(res.data.reviews);
        toast.success(res.data.message);
        }
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message)
        })
    };

  const handleReviewChange = (e) => {
        setReview((values) => ({...values, [e.target.name]: e.target.value}))
  };

  const handleReviewDelete = async(reviewId) => {
    await axios.delete(`http://localhost:8080/products/${id}/review/${reviewId}`, {headers: {Authorization: token}})
    .then((res) => {
      if(!currUser) {
        toast.error(res.data.message);
      } else {
        setProduct((prev) => ({
            ...prev,
            reviews: prev.reviews.filter(r => r._id !== reviewId)
        }))
        toast.success("Reviews Deleted Successfully")
        }
    })
    .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message)
  })
  }

  return (
    <div className="container">
    <div className="row showPage-container">
      <div className="col-10 col-md-8 col-lg-6 offset-1 offset-md-2 offset-lg-3 showPage-card">
        <h2 className="mb-3">{product.title}</h2>
        <img src={product.image} alt={product.title} className="showPage-img" />
        <p style={{fontSize: "20px"}}>Owner: <b>@{product.owner.name}</b></p>
        <p className="mt-3">{product.description}</p>
        <h6>Price ₹{product.price}</h6>
        {currUser && (
        <div className="mt-4">
          <Link to={`/products/${id}/edit`}>
            <button className="btn btn-outline-primary">Update</button>
          </Link>
          <button
            className="btn btn-outline-danger"
            style={{ marginLeft: "1.5rem" }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        )}
        <br />
        
        {currUser && (
        <div className="mt-4">
          <hr />
          <h4>Leave a Review</h4>
          <form onSubmit={handleReviewSubmit}>
    <div className="mb-1 mt-1">
  <label htmlFor="rating" className="form-label">
    Rating
  </label>

  <fieldset className="starability-slot">
    <input
      type="radio"
      id="first-rate1"
      name="rating"
      value="1"
      checked={review.rating === 1}
      onChange={handleReviewChange}
    />
    <label htmlFor="first-rate1" title="Terrible">
      1 star
    </label>

    <input
      type="radio"
      id="first-rate2"
      name="rating"
      value="2"
      checked={review.rating === 2}
      onChange={handleReviewChange}
    />
    <label htmlFor="first-rate2" title="Not good">
      2 stars
    </label>

    <input
      type="radio"
      id="first-rate3"
      name="rating"
      value="3"
      checked={review.rating === 3}
      onChange={handleReviewChange}
    />
    <label htmlFor="first-rate3" title="Average">
      3 stars
    </label>

    <input
      type="radio"
      id="first-rate4"
      name="rating"
      value="4"
      checked={review.rating === 4}
      onChange={handleReviewChange}
    />
    <label htmlFor="first-rate4" title="Very good">
      4 stars
    </label>

    <input
      type="radio"
      id="first-rate5"
      name="rating"
      value="5"
      checked={review.rating === 5}
      onChange={handleReviewChange}
    />
    <label htmlFor="first-rate5" title="Amazing">
      5 stars
    </label>
  </fieldset>
</div>
            <div className="mt-3 mb-4">
              <label htmlFor="comment">Comments</label>
              <textarea
                name="comment"
                id="comment"
                cols={30}
                rows={5}
                value={review.comment}
                onChange={handleReviewChange}
                className="form-control"
              ></textarea>
              {reviewError.comment && (
                <div style={{color: "red"}}>{reviewError.comment}</div>
              )}
            </div>
            <button className="btn btn-success" type="submit">Submit</button>
          </form>
          <br />
        </div>
        )}
        {product.reviews.length >= 1 && (
        <div className="row">
          <hr />
            <div>Reviews</div>
            {product.reviews.map((review) => (
              <div className="col-12 col-lg-6">
                <div className="review-container">
                    <h4 style={{color: "green"}}>@{review.author?.name}</h4>
                    <h5 className="starability-result text" data-rating={review.rating}></h5>
                    <p>comment: {review.comment}</p>
                    <button className="btn btn-dark" onClick={() => handleReviewDelete(review._id)}>Delete</button>
                </div>
                </div>
            ))}
            </div>
            )}
      </div>
    </div>
    </div>
  );
}

export default ShowPage;