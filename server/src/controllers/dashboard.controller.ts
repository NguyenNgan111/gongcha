import { Dashboard } from "@models";
import { User } from "@models";
import { RequestHandler } from "express";
export const createDashboard: RequestHandler = async (req, res) => {
  console.log("Start create dashboard", req.body);
  try {
    const dashboard = {
      views: req.body.views,
    };
    const newDashboard = new Dashboard(dashboard);
    const saved = await newDashboard.save();
    res.send(newDashboard);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
};

export const addViews: RequestHandler = async (req, res) => {
  try {
    const found = await Dashboard.find();
    const id = found[0].id;
    console.log(found[0].views);

    await Dashboard.findOneAndUpdate(
      { _id: id },
      { views: found[0].views + 1 }
    );
  } catch {
    res.sendStatus(400);
  }
};
export const getDashboard: RequestHandler = async (req, res) => {
  try {
    const foundDashboard = await Dashboard.find();
    const views = await foundDashboard[0].views;
    const foundUser = await User.find();
    const orders = await foundUser
      .filter((user) => user.order.length > 0)
      .map((user) => {
        return user.order;
      })
      .flat(Infinity);
    console.log("orders ne : ", orders);
    const totalPrice = orders.reduce((acc, cur: any) => {
      return acc + Number(cur.totalPrice);
    }, 0);
    const date = Array.from(new Set(orders.map((order: any) => order.date)));
    console.log("date ne : ", date);
    const chart = await date.map((item) => {
      const orderDate = orders.filter((order: any) => order.date === item);
      const sale = orderDate.reduce(
        (acc, cur: any) => acc + Number(cur.totalPrice),
        0
      );
      return { date: item, sale: sale.toString() };
    });
    console.log("chart ne: ", chart);
    res.send({
      views: views,
      totalPrice: totalPrice,
      chart: chart,
    });
  } catch {
    res.sendStatus(400);
  }
};
