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
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/user/product-slice";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Listing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [productFilter, setProductFilter] = useState({});
  const [Sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('ProductListing: ',productList);

  function handleSort(value) {
    setSort(value);
  }

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
  }, []);

  // to add the filers in url:
  useEffect(() => {
    if (productFilter && Object.keys(productFilter).length > 0) {
      const createQueryString = createSearchParam(productFilter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [productFilter]);

  function handleGetProductDetails(getCurrentProdId){
    console.log(getCurrentProdId);
    dispatch(fetchProductDetails(getCurrentProdId))
  }

  console.log(productDetails);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={productFilter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductList
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  // handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      {/* <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      /> */}
    </div>
  );
}

export default Listing;
