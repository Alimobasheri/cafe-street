-- Setup script for Cafe Street Admin functionality
-- Run this in your Supabase SQL editor

-- Create profiles table for user roles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update existing menu tables with RLS if they don't have it
ALTER TABLE menu_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_subsections ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Policies for menu_sections
CREATE POLICY "Anyone can view menu sections" ON menu_sections
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify menu sections" ON menu_sections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for menu_subsections
CREATE POLICY "Anyone can view menu subsections" ON menu_subsections
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify menu subsections" ON menu_subsections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for menu_items
CREATE POLICY "Anyone can view menu items" ON menu_items
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify menu items" ON menu_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create an admin user (replace with your email)
-- You'll need to sign up first, then run this query with your actual user ID
-- 
-- UPDATE profiles 
-- SET role = 'admin' 
-- WHERE email = 'your-admin-email@example.com';

-- Optional: Add some sample data if tables are empty
-- Uncomment and modify as needed

/*
-- Sample menu sections
INSERT INTO menu_sections (name, label, label_fn, label_color, drop_shadow, has_sub_sections, "order") VALUES
('warm_drinks', 'Warm Drinks', 'نوشیدنی‌های گرم', 'text-dark-neon-green', 'drop-shadow-dark-neon-green', false, 1),
('cold_drinks', 'Cold Drinks', 'نوشیدنی‌های سرد', 'text-dark-neon-blue', 'drop-shadow-dark-neon-blue', false, 2),
('food', 'Food', 'غذاها', 'text-dark-neon-pink', 'drop-shadow-dark-neon-pink', true, 3)
ON CONFLICT (name) DO NOTHING;

-- Sample menu subsections
INSERT INTO menu_subsections (section_id, name, label, label_fn, label_color, drop_shadow) VALUES
((SELECT id FROM menu_sections WHERE name = 'food'), 'burgers', 'Burgers', 'برگر', 'text-dark-neon-green', 'drop-shadow-dark-neon-green'),
((SELECT id FROM menu_sections WHERE name = 'food'), 'pizza', 'Pizza', 'پیتزا', 'text-dark-neon-yellow', 'drop-shadow-dark-neon-yellow')
ON CONFLICT DO NOTHING;

-- Sample menu items
INSERT INTO menu_items (section_id, subsection_id, name, label, label_fn, price, order_index) VALUES
((SELECT id FROM menu_sections WHERE name = 'warm_drinks'), NULL, 'coffee', 'Coffee', 'قهوه', 50000, 1),
((SELECT id FROM menu_sections WHERE name = 'cold_drinks'), NULL, 'iced_coffee', 'Iced Coffee', 'قهوه یخی', 60000, 1),
((SELECT id FROM menu_sections WHERE name = 'food'), (SELECT id FROM menu_subsections WHERE name = 'burgers'), 'classic_burger', 'Classic Burger', 'برگر کلاسیک', 150000, 1)
ON CONFLICT (name) DO NOTHING;
*/

