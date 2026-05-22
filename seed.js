const bcrypt = require("bcryptjs");
const { sequelize, connectDb } = require("./config/db");
const User = require("./models/userModel");
const Resturant = require("./models/resturantModel");
const Category = require("./models/categoryModel");
const Food = require("./models/foodModal");
const Order = require("./models/orderModel");
const colors = require("colors");

const seed = async () => {
  try {
    await connectDb();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    const admin = await User.create({
      userName: "admin",
      email: "admin@food.com",
      password: hashedPassword,
      phone: "0599000000",
      address: "Gaza",
      answer: "admin",
      usertype: "admin",
    });

    const user = await User.create({
      userName: "doaa",
      email: "doaa@test.com",
      password: hashedPassword,
      phone: "0599123456",
      address: "Gaza",
      answer: "blue",
    });

    const category1 = await Category.create({
      title: "Fast Food",
      imageUrl: "https://example.com/fastfood.png",
    });

    const category2 = await Category.create({
      title: "Italian",
      imageUrl: "https://example.com/italian.png",
    });

    const resturant1 = await Resturant.create({
      title: "Pizza Hut",
      imageUrl: "https://www.zilliondesigns.com/blog/wp-content/uploads/Dominos-Pizza-logo-2.jpg",
      time: "9am to 9pm",
      pickup: true,
      delivery: true,
      isOpen: true,
      logoUrl: "https://www.zilliondesigns.com/blog/wp-content/uploads/Dominos-Pizza-logo-2.jpg",
      rating: 5,
      ratingCount: "5",
      code: "1234",
      coords: {
        id: "123456",
        latitude: "1234",
        latitudeDelta: "1234",
        longitude: "1234",
        longitudeDelta: "1234",
        address: "Gaza",
      },
    });

    const resturant2 = await Resturant.create({
      title: "Burger King",
      imageUrl: "https://w1.pngwing.com/pngs/264/707/png-transparent-burger-logo-burger-king-hamburger-milkshake-fast-food-restaurant-yellow.png",
      time: "9am to 9pm",
      pickup: true,
      delivery: true,
      isOpen: true,
      logoUrl: "https://w1.pngwing.com/pngs/264/707/png-transparent-burger-logo-burger-king-hamburger-milkshake-fast-food-restaurant-yellow.png",
      rating: 5,
      ratingCount: "5",
      code: "5678",
      coords: {
        id: "789012",
        latitude: "5678",
        latitudeDelta: "5678",
        longitude: "5678",
        longitudeDelta: "5678",
        address: "Gaza",
      },
    });

    const food1 = await Food.create({
      title: "Chicken Pizza",
      description: "Delicious chicken pizza with cheese",
      price: 5,
      imageUrl: "https://www.zilliondesigns.com/blog/wp-content/uploads/Dominos-Pizza-logo-2.jpg",
      foodTags: "pizza,chicken",
      catgeory: "Fast Food",
      isAvailabe: true,
      resturnatId: resturant1.id,
      rating: 5,
      ratingCount: "10",
    });

    const food2 = await Food.create({
      title: "Margherita Pizza",
      description: "Classic margherita pizza",
      price: 4,
      imageUrl: "https://www.zilliondesigns.com/blog/wp-content/uploads/Dominos-Pizza-logo-2.jpg",
      foodTags: "pizza,vegetarian",
      catgeory: "Italian",
      isAvailabe: true,
      resturnatId: resturant1.id,
      rating: 4,
      ratingCount: "8",
    });

    const food3 = await Food.create({
      title: "Chicken Burger",
      description: "Grilled chicken burger with fries",
      price: 3,
      imageUrl: "https://w1.pngwing.com/pngs/264/707/png-transparent-burger-logo-burger-king-hamburger-milkshake-fast-food-restaurant-yellow.png",
      foodTags: "burger,chicken",
      catgeory: "Fast Food",
      isAvailabe: true,
      resturnatId: resturant2.id,
      rating: 4,
      ratingCount: "15",
    });

    const food4 = await Food.create({
      title: "Cheese Burger",
      description: "Beef burger with cheese and lettuce",
      price: 4,
      imageUrl: "https://w1.pngwing.com/pngs/264/707/png-transparent-burger-logo-burger-king-hamburger-milkshake-fast-food-restaurant-yellow.png",
      foodTags: "burger,beef",
      catgeory: "Fast Food",
      isAvailabe: true,
      resturnatId: resturant2.id,
      rating: 5,
      ratingCount: "20",
    });

    console.log("Seed data inserted successfully!".green.bold);
    console.log(`Admin: admin@food.com / 123456`.cyan);
    console.log(`User:  doaa@test.com / 123456`.cyan);

    process.exit(0);
  } catch (error) {
    console.log("Seed Error:".red, error);
    process.exit(1);
  }
};

seed();
