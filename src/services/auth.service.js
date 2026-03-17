// NOTE: DB will be added later

exports.register = async ({ name, email, password }) => {
  return {
    name,
    email
  };
};

exports.login = async ({ email, password }) => {
  return {
    token: "dummy-token",
    email
  };
};