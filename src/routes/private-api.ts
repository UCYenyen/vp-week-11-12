import express from "express";
import { CustomerController } from "../controllers/customer-controller";
import { RestaurantController } from "../controllers/restaurant-controller";
import { OrderController } from "../controllers/order-controller";

export const privateRouter = express.Router();
privateRouter.get("/customer", CustomerController.get);
privateRouter.get("/customer/:id", CustomerController.get);
privateRouter.put("/customer/:id", CustomerController.update);
privateRouter.delete("/customer/:id", CustomerController.delete);

privateRouter.post("/restaurants", RestaurantController.create);
privateRouter.get("/restaurants", RestaurantController.list);
privateRouter.get("/restaurants/:id", RestaurantController.get);
privateRouter.put("/restaurants/:id", RestaurantController.update);
privateRouter.delete("/restaurants/:id", RestaurantController.delete);

privateRouter.post("/orders", OrderController.create);
privateRouter.post("/orders", OrderController.create);
privateRouter.get("/orders", OrderController.list);
privateRouter.get("/orders/:id", OrderController.get);
privateRouter.put("/orders/:id", OrderController.update);
privateRouter.delete("/orders/:id", OrderController.delete);