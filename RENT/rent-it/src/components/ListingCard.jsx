import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";
function ListingCard({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  pincode,
  country,
  category,
  type,
  price,
  booking = false,
  startDate,
  endDate,
  totalPrice,
}) {
  /*SLIDER FOR IMAGE */
  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const gotoPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  // Function to format the photo path
  const formatPhotoPath = (path) => {
    return `http://localhost:3000/uploads/${path.split("\\").pop()}`;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3000/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
      console.log(data);
      
    } else {
      return;
    }
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div
              className={`slide ${index === currentIndex ? "active" : ""}`}
              key={index}
            >
              {index === currentIndex && (
                <img
                  src={formatPhotoPath(photo)}
                  alt={`photo ${index + 1}`}
                  onClick={() => {
                    navigate(`/properties/${listingId}`);
                  }}
                />
              )}
              <div className="prev-button" onClick={gotoPrevSlide}>
                <ArrowBackIosNew style={{ fontSize: "15px" }} />
              </div>
              <div className="next-button" onClick={gotoNextSlide}>
                <ArrowForwardIos style={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
        <h3>
          {city}, {country}
        </h3>
        <p>{category}</p>

        {!booking ? (
          <>
            <p>{type}</p>
            <p>
              <span>₹{price}</span> per night
            </p>
          </>
        ) : (
          <>
            <p>
              {startDate} - {endDate}
            </p>
            <p>
              <span>₹{totalPrice}</span> total
            </p>
          </>
        )}
      </div>

      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
}
export default ListingCard;
