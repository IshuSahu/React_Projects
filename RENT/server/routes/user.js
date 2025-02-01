const router = require("express").Router();

const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

/* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trips);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find trips!", error: err.message });
  }
});

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/wishlist/:listingId", async (req, res) => {
  const { userId, listingId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add to wishlist if not already present
    if (!user.wishlist.includes(listingId)) {
      user.wishlist.push(listingId);
      await user.save();
      return res.status(200).json({ wishList: user.wishlist });
    }

    return res.status(400).json({ message: "Listing already in wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Remove listing from wishlist
router.delete("/:userId/wishlist/:listingId", async (req, res) => {
  const { userId, listingId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove from wishlist if present
    user.wishlist = user.wishlist.filter((id) => id !== listingId);
    await user.save();
    res.status(200).json({ wishList: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/* GET PROPERTY LIST */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(properties);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find properties!", error: err.message });
  }
});

/* GET RESERVATION LIST */
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(reservations);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find reservations!", error: err.message });
  }
});

module.exports = router;
