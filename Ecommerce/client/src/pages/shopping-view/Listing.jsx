import ProductDetails from "@/components/shopping-view/ProductDetails";
import ProductFilter from "@/components/shopping-view/ProductFilter";
import ShoppingProductList from "@/components/shopping-view/ProductList";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/user/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/user/product-slice";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

function Listing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [productFilter, setProductFilter] = useState({});
  const [Sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const categorySearchparam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }
  useEffect(() => {
    setSort("price-lowtohigh");
    const stored = JSON.parse(sessionStorage.getItem("productFilter"));
    setProductFilter(stored || { category: ["All"] });
  }, [categorySearchparam]);

  function createSearchParam(filterParams) {
    const queryParam = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParam.push(`${key}=${encodeURIComponent(paramValue)}`);
        return queryParam.join("&");
      }
    }
  }
  // we will show option of only the selcted category and brand
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilter = { ...productFilter };
    const indexOfCurrentSection = Object.keys(cpyFilter).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilter = {
        ...cpyFilter,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilter[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilter[getSectionId].push(getCurrentOption);
      } else {
        cpyFilter[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    sessionStorage.setItem("productFilter", JSON.stringify(cpyFilter));
    setProductFilter(cpyFilter);
    // console.log(cpyFilter);
  }

  useEffect(() => {
    if (productFilter !== null && Sort !== null)
      dispatch(
        fetchAllFilteredProducts({
          filterParams: productFilter,
          sortParams: Sort,
        })
      );
  }, [dispatch, Sort, productFilter]);

  // default set on page load
  useEffect(() => {
    setSort("price-lowtohigh");
    setProductFilter(JSON.parse(sessionStorage.getItem("productFilter")) || {});
  }, [categorySearchparam]);

  // to add the filers in url:
  useEffect(() => {
    if (productFilter && Object.keys(productFilter).length > 0) {
      const createQueryString = createSearchParam(productFilter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [productFilter]);

  function handleGetProductDetails(getCurrentProdId) {
    console.log(getCurrentProdId);
    dispatch(fetchProductDetails(getCurrentProdId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      // if user not logged in, redirect to login
      navigate("/auth/login");
      toast({
        title: "Please login to add products to your cart",
        variant: "destructive",
      });
      return;
    }
    console.log(cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

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
  // console.log(productDetails);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={productFilter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-sm md:text-lg font-bold md:font-extrabold">
            All Products
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 "
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px] z-50">
                <DropdownMenuRadioGroup value={Sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default Listing;
