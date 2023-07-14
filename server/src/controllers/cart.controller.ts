import { Cart, ICartItem } from "@models";
import { RequestHandler } from "express";
export const createCart: RequestHandler = async (req, res) => {
  try {
    console.log("Start create product", req.body);
    const { idProduct, quantity, size } = req.body.value;
    const cart = {
      idUser: req.body.id,
      cartList: [
        {
          idProduct: idProduct,
          quantity: quantity,
          size: size,
        },
      ],
    };
    const newCart = new Cart(cart);
    const saved = await newCart.save();
    console.log("finish: ", saved);
    res.send(newCart);

    res.sendStatus(200);
  } catch (e) {
    console.log("for testing error: ", e);
  }
};
export const addCart: RequestHandler = async (req, res) => {
  const idUser = req.body.id;
  console.log("Start add product", req.body);
  const { idProduct, quantity, size } = req.body.value;
  try {
    const findCart = await Cart.findOne({ idUser: idUser });
    if (findCart) {
      const indexProduct = await findCart.cartList.findIndex(
        (product) => product.idProduct === idProduct && product.size === size
      );
      if (indexProduct > -1) {
        findCart.cartList[indexProduct].quantity += Number(quantity);
        await Cart.findOneAndUpdate(
          { idUser: idUser },
          { cartList: findCart.cartList }
        );
      } else {
        await findCart.cartList.push({
          idProduct: idProduct,
          quantity: quantity,
          size: size,
        });
        await Cart.findOneAndUpdate(
          { idUser: idUser },
          { cartList: findCart.cartList }
        );
      }
      res.sendStatus(200);
    } else {
      try {
        console.log("Start create product", req.body);
        const cart = {
          idUser: req.body.id,
          cartList: [
            {
              idProduct: idProduct,
              quantity: quantity,
              size: size,
            },
          ],
        };
        const newCart = new Cart(cart);
        const saved = await newCart.save();
        console.log("finish: ", saved);
        res.send(newCart);
        res.sendStatus(200);
      } catch (e) {
        res.sendStatus(400);
      }
    }
  } catch {
    res.sendStatus(403);
  }
};

export const getCart: RequestHandler = async (req, res) => {
  const idUser = req.body.id;
  try {
    const cart = await Cart.findOne({ idUser: idUser });
    if (cart) {
      cart?.populate("cartList.idProduct").then((data) => {
        res.send(data);
      });
    } else {
      res.send([]);
    }
  } catch {
    res.sendStatus(400);
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  const idUser = req.body.id;
  try {
    const { idCartItem } = req.body.value;
    const findCart = await Cart.findOne({ idUser: idUser });
    if (findCart) {
      console.log("find cart: ", findCart);
      const indexProductInCart = findCart.cartList.findIndex(
        (cartItem: any) => cartItem.id === idCartItem
      );
      console.log("cart ne: ", findCart.cartList[indexProductInCart]);
      if (indexProductInCart > -1) {
        await findCart.cartList.splice(indexProductInCart, 1);
        await Cart.findOneAndUpdate(
          { idUser: idUser },
          { cartList: findCart.cartList }
        );
        if (findCart.cartList.length === 0) {
          await Cart.findOneAndDelete({ idUser: idUser });
        }
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }
  } catch {
    res.sendStatus(400);
  }
};
export const updateCart: RequestHandler = async (req, res) => {
  const idUser = req.body.id;
  try {
    const findCart = await Cart.findOne({ idUser: idUser });
    if (findCart) {
      const { idCartItem, quantity } = req.body.value;
      const indexProduct = findCart.cartList.findIndex(
        (cartItem: any) => cartItem.id === idCartItem
      );
      if (indexProduct > -1) {
        findCart.cartList[indexProduct].quantity = Number(
          req.body.value.quantity
        );
        await Cart.findOneAndUpdate(
          { idUser: idUser },
          { cartList: findCart.cartList }
        );
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }
  } catch {
    res.sendStatus(400);
  }
};
