-- Migration: Add admin users
-- Created: 2025-12-22 20:27:55 UTC

-- Insert admin users into user_roles table
INSERT INTO user_roles (email, role)
VALUES 
  ('bmw.kojak@gmail.com', 'admin'),
  ('rgr-rs@hotmail.com', 'admin')
ON CONFLICT (email) DO UPDATE 
SET role = 'admin';
