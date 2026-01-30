import { supabase } from "../config/supabase.js";

// USER SIGNUP
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check duplicate email
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  // Insert user
  const { error } = await supabase.from("users").insert([
    { name, email, password }
  ]);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json({ message: "User registered successfully" });
};

// DELETE USER (Cascade delete todos)
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "User and related todos deleted" });
};
