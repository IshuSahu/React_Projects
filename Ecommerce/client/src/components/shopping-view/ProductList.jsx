import { Card, CardContent, CardFooter } from "../ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function ShoppingProductList({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full h-100px max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[100px] md:h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-[8px] md:text-sm">
              {`Only ${product?.totalStock} items left `}
            </Badge>
          ) : product?.salePrice > 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-[8px] md:text-[12px]">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-2 md:p-4">
          <h2 className="text-sm md:text-xl font-bold mb-1 md:mb-2">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-1 md:mb-2">
            <span className="text-[10px] md:text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[10px] md:text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-1 md:mb-2 text-[10px] md:text-lg">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              }text-[10px] md:text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-[10px] md:text-lg font-semibold text-primary ">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-1 ml-3 md:p-2 ">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className=" w-[70px] h-[20px] md:w-full md:h-full text-[10px] md:text-lg"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductList;
