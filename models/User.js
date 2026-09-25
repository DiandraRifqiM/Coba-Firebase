const userSchema = {
  name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
};

const validateUser = (data) => {
  for (const field in data) {
    const rules = userSchema[field];
    const value = data[field];

    // Required
    if (rules.required && value === undefined) {
      throw new Error(`${field} are required!!`);
    }

    // Type
    if (value !== undefined && typeof value !== rules.type) {
      throw new Error(`${field} must be ${rules.type}, got ${typeof field}`);
    }
  }

  return true;
};

module.exports = { userSchema, validateUser };
