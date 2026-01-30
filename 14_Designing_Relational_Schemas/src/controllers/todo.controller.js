import { supabase } from "../config/supabase.js";

// CREATE TODO
export const addTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ message: "Title and userId required" });
  }

  const { error } = await supabase.from("todos").insert([
    { title, description, user_id: userId }
  ]);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json({ message: "Todo created" });
};

// GET USER TODOS
export const getMyTodos = async (req, res) => {
  const { userId } = req.params;

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { data } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  res.json(data);
};

// UPDATE TODO
export const updateTodo = async (req, res) => {
  const { todoId } = req.params;

  const { data: todo } = await supabase
    .from("todos")
    .select("id")
    .eq("id", todoId)
    .single();

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const { error } = await supabase
    .from("todos")
    .update(req.body)
    .eq("id", todoId);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Todo updated" });
};

// DELETE TODO
export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todoId);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Todo deleted" });
};
