import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const WishList = () => {
    const [fullWishList, setFullWishList] = useState([]);
    const wishList = useSelector((state) => state.user.wishList);  // list of listing IDs

    useEffect(() => {
        const fetchListingDetails = async () => {
            try {
                console.log("Fetching listings for IDs:", wishList);
                const response = await fetch("http://localhost:3000/properties/get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ids: wishList }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched listings:", data);
                    setFullWishList(data);
                } else {
                    console.error("Failed to fetch listing details");
                }
            } catch (error) {
                console.error("Error fetching listing details:", error);
            }
        };
    
        if (wishList.length > 0) {
            fetchListingDetails();
        }
    }, [wishList]);
    

    return (
        <>
            <Navbar />
            <h1 className="title-list">Your Wish List</h1>
            <div className="list">
                {fullWishList?.length > 0 ? (
                    fullWishList.map(
                        ({
                            _id,
                            creator,
                            listingPhotoPaths,
                            city,
                            province,
                            country,
                            category,
                            type,
                            price,
                            booking = false,
                        }) => (
                            <ListingCard
                                key={_id}
                                listingId={_id}
                                creator={creator}
                                listingPhotoPaths={listingPhotoPaths}
                                city={city}
                                province={province}
                                country={country}
                                category={category}
                                type={type}
                                price={price}
                                booking={booking}
                            />
                        )
                    )
                ) : (
                    <p>No listings in your wish list yet!</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default WishList;
