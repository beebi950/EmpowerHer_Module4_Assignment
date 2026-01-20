const validateTodo = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);

  if (!req.body.title || bodyKeys.length !== 1) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed"
    });
  }

  next();
};

export default validateTodo;
