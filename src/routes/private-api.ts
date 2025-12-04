import express from "express";
import { CustomerController } from "../controllers/customer-controller";
import { RestaurantController } from "../controllers/restaurant-controller";
import { OrderController } from "../controllers/order-controller";

export const privateRouter = express.Router();

privateRouter.post("/customer", CustomerController.create);
privateRouter.get("/customers", CustomerController.list);
privateRouter.get("/customer/:id", CustomerController.get);
privateRouter.put("/customer/:id", CustomerController.update);
privateRouter.delete("/customer/:id", CustomerController.delete);

privateRouter.post("/restaurants", RestaurantController.create);
privateRouter.get("/restaurants", RestaurantController.list);
privateRouter.get("/restaurants/:id", RestaurantController.get);
privateRouter.put("/restaurants/:id", RestaurantController.update);
privateRouter.delete("/restaurants/:id", RestaurantController.delete);

privateRouter.post("/order", OrderController.create);
privateRouter.get("/orders", OrderController.list);
privateRouter.get("/order/:id", OrderController.get);
privateRouter.delete("/order/:id", OrderController.delete);