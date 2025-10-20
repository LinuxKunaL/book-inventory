import { Router } from "express";

import { MUser } from "../../models/new/user.model";
import { MBook } from "../../models/new/books.model";
import { MOrder } from "../../models/new/order.model";

const router = Router();

router.post("/addUser", async (req, res): Promise<any> => {
  try {
    const user = await MUser.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    await MUser.create(req.body);
    return res.status(200).json({ message: "User Created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
});
router.get("/getUsers", async (req, res) => {
  const user = await MUser.find({});

  res.status(200).send(user);
});

router.post("/addBook", async (req, res): Promise<any> => {
  try {
    await MBook.create(req.body);
    return res.status(200).json({ message: "Book added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding book" });
  }
});
router.get("/getBooks", async (req, res) => {
  const books = await MBook.find({});

  res.status(200).send(books);
});

router.get("/getOrders", async (req, res) => {
  try {
    const orders = await MOrder.find({}).populate("createdBy");
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateOrder", async (req, res) => {
  try {
    await MOrder.findByIdAndUpdate(
      { _id: req.body.id },
      { status: req.body.status }
    );
    res.status(200).send({ message: "Order updated" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/createOrder", async (req: any, res) => {
  try {
    await MOrder.create({
      ...req.body,
      createdBy: req.user.id,
      status: "pending",
    });
    res.status(200).send({ message: "Order created" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/getProprietorOrders", async (req: any, res) => {
  try {
    console.log(req.user);
    
    const orders = await MOrder.find({ createdBy: req.user.id });
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
  }
});
router.post("/deleteOrder", async (req: any, res) => {
  try {
    await MOrder.findByIdAndDelete(req.body.id);
    res.status(200).send({ message: "Order deleted" });
  } catch (error) {
    console.log(error);
  }
});

// router.use("/students", studentRoues);
// router.use("/schools", schoolRoutes);
// router.use("/courses", courseRoutes);
// router.use("/quizzes", quizRoutes);
// router.use("/overview",otherRoutes)
// router.use("/notifications", notificationRoutes);

export default router;
