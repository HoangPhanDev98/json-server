import { faker } from "@faker-js/faker";
import fs from "fs";

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  //   loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.color.human(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      productList.push(product);
    });
  }

  return productList;
};

(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Po",
    },
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("ok");
  });
})();

// export function createRandomUser(): User {
//   return {
//     userId: faker.datatype.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     birthdate: faker.date.birthdate(),
//     registeredAt: faker.date.past(),
//   };
// }

// Array.from({ length: 10 }).forEach(() => {
//   USERS.push(createRandomUser());
// });
