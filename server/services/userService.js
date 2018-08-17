function create(userRepository) {
  async function getAllUsers() {
    const users = await userRepository.getAll();
    return users;
  }

  async function createUser(user) {
    await userRepository.add(user);
  }

  async function createSubscribers(users) {
    await userRepository.addMany(users);
  }

  async function getUser(id) {
    const user = await userRepository.getById(id);
    return user;
  }

  async function updateLastLogin(user) {
    const userIsObject = typeof user === 'object';
    const userId = userIsObject ? user.id : undefined;

    if (userId === undefined) {
      return;
    }

    const updateData = {
      lastLogin: new Date()
    };

    userRepository.updateUserById(userId, updateData);
  }

  async function getUserByName(name) {
    let user;

    try {
      user = await userRepository.findByName(name);
    } catch(error) {
      throw new Error("No user with the given name");
    }

    return user;
  }
  

  async function verifyUser(name, password) {

    if (!name || name.length === 0 || !password || password.length === 0) {
      throw new Error("You need a name and password");
    }

    const user = await getUserByName(name);
    let isPasswordValid = false;

    isPasswordValid = user.isPasswordValid(password);

    if (isPasswordValid) {
      return user;
    } 
      
    throw new Error("Wrong password");
  };

  async function registerUser(name, password, email) {
    const newUserData = {
      name,
      password,
      email,
      registered: new Date(),
      lastLogin: new Date()
    }

    const newUser = await userRepository.add(newUserData);
    return newUser;
  }


  return {
    createUser,
    getAllUsers,
    getUser,
    createSubscribers,
    updateLastLogin,
    getUserByName,
    verifyUser,
    registerUser
  };
}

module.exports.create = create;
