import { Button, Card, CardBody, CardFooter, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useAppDispatch, useAppSelector } from "../hooks";
import { OrderItemInterface } from "../interfaces/order-item.interface";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { reduceCartItems } from "../utils/cartUtils";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  const addToCartHandler = (item: OrderItemInterface, qty: number) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="flex justify-center items-center mt-12 h-6 gap-2">
        <Button color="primary" variant="bordered" onClick={() => navigate("/")}>
          Back
        </Button>
        <Divider orientation="vertical" />
        <h1 className="text-lg font-bold">Shopping Cart</h1>
      </div>

      <div className="flex-col sm:flex sm:flex-row justify-between mt-6">
        {cartItems.length === 0 ? (
          <div className="h-full w-full mt-10 flex">
            <span className="w-1/2 hidden lg:block" id="do-not-remove"></span>
            <div className="w-full lg:w-1/2">
              <Message title="Your Cart Is Empty" />
            </div>
          </div>
        ) : (
          <div className="w-full sm:w-3/4 sm:h-[60rem] overflow-auto">
            {cartItems?.map((item) => (
              <Card key={item._id} className="w-full flex my-4">
                <CardBody>
                  <div className="w-full flex items-center justify-between gap-4">
                    <Image
                      loading="lazy"
                      fallbackSrc={"/images/no-image.jpg"}
                      src={item.image}
                      alt={item.name}
                      radius="sm"
                      className="object-cover max-h-20"
                      height={80}
                      width={50}
                    ></Image>
                    <Link className="w-40 underline text-violet-500" to={`/product/${item._id}`}>
                      {item.name}
                    </Link>
                    <p>${item.price}</p>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">{item.qty}</Button>
                      </DropdownTrigger>
                      <DropdownMenu onAction={(key) => addToCartHandler(item, Number(key))}>
                        {Array(item.countInStock > 10 ? 10 : item.countInStock)
                          .fill(0)
                          .map((_, idx) => (
                            <DropdownItem key={idx + 1} value={idx + 1}>
                              {idx + 1}
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                    <Button type="button" variant="bordered" color="danger" onClick={() => removeFromCartHandler(item._id || "")}>
                      <FaTrash />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        <div className="w-full sm:w-1/2 flex justify-center content-center mt-6">
          <Card className="h-40 w-full sm:w-1/2">
            <CardBody>
              <h2 className="font-bold text-md">Subtotal ({reduceCartItems(cartItems)}) item(s)</h2>
              <p>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
              <Divider className="mt-2" />
            </CardBody>
            <CardFooter className="flex-col sm:flex sm:flex-row justify-center">
              <Button type="button" variant="solid" color="primary" className="btn-block" isDisabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
