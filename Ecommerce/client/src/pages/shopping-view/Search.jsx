import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ShoppingProductList from "@/components/shopping-view/ProductList";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import { useToast } from "@/hooks/use-toast";
import { getSearchResults, resetSearchResults } from "@/store/user/search-slice";
import { addToCart, fetchCartItems } from "@/store/user/cart-slice";
import { fetchProductDetails } from "@/store/user/product-slice";
import debounce from "lodash/debounce";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { searchResults, suggestions, isLoading } = useSelector(
    (state) => state.shopSearch
  );
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    const debouncedSearch = debounce((keyword) => {
      if (keyword.trim().length > 3) {
        dispatch(getSearchResults({ keyword, page: 1 }));
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      } else {
        dispatch(resetSearchResults());
        setSearchParams(new URLSearchParams());
      }
    }, 500);

    debouncedSearch(keyword);

    return () => debouncedSearch.cancel();
  }, [keyword]);

  const handleAddToCart = (productId, stock) => {
    const cartItem = cartItems.items?.find((item) => item.productId === productId);

    if (cartItem && cartItem.quantity >= stock) {
      toast({
        title: `Only ${stock} items are available for this product.`,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart!" });
      }
    });
  };

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
        />
        {suggestions.length > 0 && (
          <div className="bg-gray-100 shadow p-4 mt-2">
            <h4 className="font-bold">Suggestions:</h4>
            <ul>
              {suggestions.map((item) => (
                <li
                  key={item._id}
                  className="cursor-pointer hover:underline"
                  onClick={() => setKeyword(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isLoading && <p>Loading...</p>}
      {!searchResults.length && !isLoading && <p>No results found!</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((item) => (
          <ShoppingProductList
            key={item._id}
            product={item}
            handleAddToCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>

      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;