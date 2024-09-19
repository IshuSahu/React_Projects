import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import ListingCard from "../components/ListingCard";
function HomePage() {
  return (
    <>
      <Navbar />
      <Slide/>
      <Categories/>
      <Listings/>
      <ListingCard/>
    </>
  );
}

export default HomePage;
