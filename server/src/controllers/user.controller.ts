import { Cart } from "@models";
import { User } from "@models";
import { Product } from "@models";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
function generateAccessToken(user: {}) {
  return jwt.sign(user, process.env.TOKEN_SECRET as string, {
    expiresIn: "1800000000000000s",
  });
}

export const getUser: RequestHandler = async (req, res) => {
  const found = await User.find();
  res.send(found);
};

// export const createUser: RequestHandler = async (req, res) => {
//   console.log("Start create product", req.body);

//   const newUser = new User(req.body);
//   const saved = await newUser.save();
//   console.log(saved);

//   res.send(newUser);
// };
export const regist: RequestHandler = async (req, res) => {
  const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
  const newUser = {
    phone: req.body.phone,
    pwd: hashedPwd,
    role: req.body.role,
    order: [],
  };
  const duplicate = await User.findOne({ phone: newUser.phone });
  if (duplicate) {
    res.sendStatus(409);
  } else {
    const addNewUser = new User(newUser);
    const saved = await addNewUser.save();
    console.log(newUser);
    res.sendStatus(200);
  }
};
export const login: RequestHandler = async (req, res) => {
  const loginUser = {
    phone: req.body.phone,
    pwd: req.body.pwd,
  };
  const tokenUser = {
    phone: req.body.phone,
    role: "user",
  };
  const user = await User.findOne({ phone: loginUser.phone });
  if (!user) {
    res.sendStatus(401);
  } else {
    try {
      console.log("login....");
      if (await bcrypt.compare(req.body.pwd, user.pwd)) {
        const accessToken = generateAccessToken(tokenUser);
        res.json({ accessToken: accessToken });
      } else {
        res.sendStatus(401);
      }
    } catch {
      res.sendStatus(500);
    }
  }
};
export const loginAdmin: RequestHandler = async (req, res) => {
  const loginUser = {
    phone: req.body.phone,
    pwd: req.body.pwd,
  };
  const tokenUser = {
    phone: req.body.phone,
    role: "admin",
  };
  const user = await User.findOne({ phone: loginUser.phone });
  if (!user) {
    res.sendStatus(401);
  } else {
    if (user.role === "admin") {
      try {
        console.log("login....");
        if (await bcrypt.compare(req.body.pwd, user.pwd)) {
          const accessToken = generateAccessToken(tokenUser);
          res.json({ accessToken: accessToken });
        } else {
          res.sendStatus(401);
        }
      } catch {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(403);
    }
  }
};

export const updatePwdUser: RequestHandler = async (req, res) => {
  console.log("req ne: ", req.body);
  const reqPwd = { ...req.body.value };
  const idUser = req.body.id;
  try {
    let findUser = await User.findOne({ _id: idUser });
    if (findUser && (await bcrypt.compare(reqPwd.oldPwd, findUser?.pwd))) {
      findUser.pwd = await bcrypt.hash(reqPwd.newPwd, 10);
      await User.findOneAndUpdate({ _id: idUser }, { pwd: findUser.pwd });
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch {
    res.sendStatus(400);
  }
};
export const updateRoleUser: RequestHandler = async (req, res) => {
  console.log("req ne: ", req.body);
  const idUser = req.body.id;
  const newRole = req.body.newRole;
  try {
    let findUser = await User.findOne({ _id: idUser });
    if (findUser) {
      await User.findOneAndUpdate({ _id: idUser }, { role: newRole });
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch {
    res.sendStatus(400);
  }
};

export const checkToken: RequestHandler = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if (token == null) {
      res.sendStatus(401);
    } else {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET as string,
        async (err, user) => {
          if (err) {
            res.sendStatus(401);
          } else {
            const userX = Object(user);
            const newUser = await User.findOne({
              phone: userX.phone,
            });
            console.log("user ne: ", newUser);
            if (newUser?.role === "admin") {
              res.sendStatus(200);
            } else {
              res.sendStatus(401);
            }
          }
        }
      );
    }
  } catch {
    res.sendStatus(403);
  }
};
export const addOrder: RequestHandler = async (req, res) => {
  console.log("req ne: ", req.body);
  const reqOrder = { ...req.body.value };
  const idUser = req.body.id;
  const date = new Date().toLocaleDateString("es-pa");
  const detailOrder = reqOrder.detailOrder;
  let totalPrice = 0;
  try {
    //add order property in user
    totalPrice = detailOrder.reduce((acc: any, cur: any) => {
      return Number(acc) + Number(cur.price) * Number(cur.quantityProduct);
    }, 0);
    let findUser = await User.findOne({ _id: idUser });
    if (findUser) {
      const newOrder = {
        orderNumber: new Date().getTime().toString(),
        date: date,
        totalPrice: totalPrice.toString(),
        detailOrder: detailOrder,
      };
      console.log("new order ne: ", newOrder);
      findUser?.order.push(newOrder);
      await User.findOneAndUpdate({ _id: idUser }, { order: findUser?.order });
      //update bought property in product
      await detailOrder?.forEach(async (element: any) => {
        let product = await Product.findOne({ _id: element.idProduct });
        if (product) {
          product.bought += Number(element.quantityProduct);
          await Product.findOneAndUpdate(
            { _id: element.idProduct },
            { bought: product.bought }
          );
        }
      });
      //delete cart list property in cart
      const foundCart = await Cart.findOne({ idUser: idUser });
      await detailOrder?.forEach(async (element: any) => {
        const indexCartItem = await foundCart?.cartList.findIndex(
          (item) => item.idProduct === element.idProduct
        );
        if (Number(indexCartItem) > -1) {
          await foundCart?.cartList.splice(Number(indexCartItem), 1);
          await Cart.findOneAndUpdate(
            { idUser: idUser },
            { cartList: foundCart?.cartList }
          );
        }
      });
      if (foundCart?.cartList.length === 0) {
        await Cart.findOneAndDelete({ idUser: idUser });
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch {
    res.sendStatus(400);
  }
};
export const getOrder: RequestHandler = async (req, res) => {
  console.log("req ne: ", req.body);
  const idUser = req.body.id;
  try {
    let findUser = await User.findOne({ _id: idUser });
    if (findUser) {
      res.send(findUser.order);
    } else {
      res.sendStatus(403);
    }
  } catch {
    res.sendStatus(400);
  }
};
