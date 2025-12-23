-- Migration: Add admin users
-- Created: 2025-12-22 20:27:55 UTC

-- Note: This migration assumes the user IDs exist in auth.users
-- You need to replace the UUIDs below with actual user IDs from your auth.users table

-- Insert admin users into user_roles table
-- Example structure (uncomment and update with real user IDs):
-- INSERT INTO user_roles (user_id, role)
-- VALUES 
--   ('USER_ID_FOR_bmw.reta@hotmail.com', 'admin'),
--   ('USER_ID_FOR_rgr-rs@hotmail.com', 'admin')
-- ON CONFLICT (user_id, role) DO NOTHING;
