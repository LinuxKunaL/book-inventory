"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../../models/new/user.model");
const books_model_1 = require("../../models/new/books.model");
const order_model_1 = require("../../models/new/order.model");
const router = (0, express_1.Router)();
router.post("/addUser", async (req, res) => {
    try {
        const user = await user_model_1.MUser.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        await user_model_1.MUser.create(req.body);
        return res.status(200).json({ message: "User Created" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user" });
    }
});
router.get("/getUsers", async (req, res) => {
    const user = await user_model_1.MUser.find({});
    res.status(200).send(user);
});
router.post("/addBook", async (req, res) => {
    try {
        await books_model_1.MBook.create(req.body);
        return res.status(200).json({ message: "Book added" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding book" });
    }
});
router.get("/getBooks", async (req, res) => {
    const books = await books_model_1.MBook.find({});
    res.status(200).send(books);
});
router.get("/getOrders", async (req, res) => {
    try {
        const orders = await order_model_1.MOrder.find({}).populate("createdBy");
        res.status(200).send(orders);
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/updateOrder", async (req, res) => {
    try {
        await order_model_1.MOrder.findByIdAndUpdate({ _id: req.body.id }, {
            status: req.body.status,
            isDoneDelivery: req.body.status == "delivered",
        });
        if (req.body.status === "delivered") {
            const order = await order_model_1.MOrder.findById(req.body.id);
            if (order && order.items?.length) {
                // Loop through each item and decrement quantity by item.qty
                const bulkOps = order.items.map((item) => ({
                    updateOne: {
                        filter: { _id: item.bookId },
                        update: { $inc: { quantity: -item.qty } },
                    },
                }));
                await books_model_1.MBook.bulkWrite(bulkOps);
            }
        }
        res.status(200).send({ message: "Order updated" });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/deleteBook", async (req, res) => {
    try {
        await books_model_1.MBook.findByIdAndDelete(req.body.id);
        res.status(200).send({ message: "Book deleted" });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/updateBook", async (req, res) => {
    try {
        await books_model_1.MBook.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).send({ message: "Book updated" });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/createOrder", async (req, res) => {
    try {
        await order_model_1.MOrder.create({
            ...req.body,
            createdBy: req.user.id,
            status: "pending",
        });
        res.status(200).send({ message: "Order created" });
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/getProprietorOrders", async (req, res) => {
    try {
        console.log(req.user);
        const orders = await order_model_1.MOrder.find({ createdBy: req.user.id });
        res.status(200).send(orders);
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/deleteOrder", async (req, res) => {
    try {
        await order_model_1.MOrder.findByIdAndDelete(req.body.id);
        res.status(200).send({ message: "Order deleted" });
    }
    catch (error) {
        console.log(error);
    }
});
// router.use("/students", studentRoues);
// router.use("/schools", schoolRoutes);
// router.use("/courses", courseRoutes);
// router.use("/quizzes", quizRoutes);
// router.use("/overview",otherRoutes)
// router.use("/notifications", notificationRoutes);
exports.default = router;
