import React, { useEffect, useState } from "react";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/user/product-slice";
import { addToCart, fetchCartItems } from "@/store/user/cart-slice";
import { Card, CardContent } from "@/components/ui/card";
import ShoppingProductList from "@/components/shopping-view/ProductList";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import { Button } from "@/components/ui/button";
import { getFeatureImages } from "@/store/common-slice";
import assy from "../../assets/category/assy.png";
import footware from "../../assets/category/footware.png";
import kids from "../../assets/category/kids.png";
import men from "../../assets/category/men.png";
import women from "../../assets/category/women.png";
import nike from "../../assets/brand/nike.png";
import adidas from "../../assets/brand/adidas.png";
import puma from "../../assets/brand/puma.png";
import zara from "../../assets/brand/zara.png";
import hm from "../../assets/brand/H&M.png";
import levis from "../../assets/brand/levis.png";
const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon, img: men },
  { id: "women", label: "Women", icon: CloudLightning, img: women },
  { id: "kids", label: "Kids", icon: BabyIcon, img: kids },
  { id: "accessories", label: "Accessories", icon: WatchIcon, img: assy },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon, img: footware },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt, img: nike },
  { id: "adidas", label: "Adidas", icon: WashingMachine, img: adidas },
  { id: "puma", label: "Puma", icon: ShoppingBasket, img: puma },
  { id: "levi", label: "Levi's", icon: Airplay, img: levis },
  { id: "zara", label: "Zara", icon: Images, img: zara },
  { id: "h&m", label: "H&M", icon: Heater, img: hm },
];
function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList = [] } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("productFilter");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("productFilter", JSON.stringify(currentFilter));
    navigate(`/user/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  // console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);
  // console.log("Feature Img: ", featureImageList);

  useEffect(() => {
    if (featureImageList && featureImageList.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % featureImageList.length
        );
      }, 5000);

      return () => clearInterval(timer); // Cleanup the interval on component unmount or when featureImageList changes
    }
  }, [featureImageList]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[150px] md:h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className=" py-3 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className=" text-xl md:text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-1">
                  {/* <categoryItem.icon className="w-8 h-8 md::w-12 md:h-12 mb-4 text-primary" /> */}
                  <img
                    src={categoryItem.img}
                    alt={categoryItem.label || "Category"}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </CardContent>
                <span className="font-medium md:font-bold text-xs md:text-xl text-center">
                  {categoryItem.label}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-3 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-8">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-1">
                  {/* <brandItem.icon className="w-8 h-8 md::w-12 md:h-12 mb-4 text-primary" /> */}
                  {/* <span className="font-medium md:font-bold text-xs md:text-xl text-center">{brandItem.label}</span> */}
                  <img src={brandItem.img} alt="" srcset="" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-3 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className=" text-xl md:text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductList
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default Home;
