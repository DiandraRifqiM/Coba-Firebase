// Connect Db
// require("./utils/db");

const {
  createUser,
  searchUsers,
  getUsers,
  updateUser,
} = require("./services/userService");

const main = async () => {
  try {
    // const user = await createUser({
    //   name: "Wormy",
    //   password: "wormy123",
    // });

    // const getUsers = await searchUsers("diandra").then((result) =>
    //   console.log(result)
    // );
    const showAllUsers = await getUsers().then((result) => result);
    console.log(showAllUsers);
    console.log("===========");
    const update = await updateUser("Wormy12", "Wormy69").then(
      (result) => result
    );
    console.log(update);
  } catch (error) {
    console.log(error.message);
  }
};

main();
