import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
export const authMiddleware: RequestHandler = (req, res, next) => {
  console.log("dang o middleware");
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
            res.sendStatus(403);
          } else {
            const userX = Object(user);
            const newUser = await User.findOne({
              phone: userX.phone,
            });
            console.log("admin ne: ", newUser);
            if (newUser?.role === "admin") {
              next();
            } else {
              res.sendStatus(403);
            }
          }
        }
      );
    }
  } catch {
    res.sendStatus(403);
  }
};
export const userMiddleware: RequestHandler = (req, res, next) => {
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
            res.sendStatus(403);
          } else {
            const userX = Object(user);
            const newUser = await User.findOne({
              phone: userX.phone,
            });
            if (newUser?.role === "user") {
              const propUser = await {
                id: newUser.id,
                value: req.body,
              };
              req.body = propUser;
              next();
            } else {
              res.sendStatus(403);
            }
          }
        }
      );
    }
  } catch {
    res.sendStatus(403);
  }
};
