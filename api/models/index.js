const User =require( "../models/user.model")
const Brand =require( "../models/brand.model")
const Category =require( "../models/category.model")
const OrderDetail =require( "../models/order_details.model")
const Order =require( "../models/order.model")
const Product =require( "../models/product.model")
const Review =require( "../models/review.model")

module.exports = {Brand, Category, Order, OrderDetail, Product, Review, User}