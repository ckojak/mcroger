-- Migration: Add admin users
-- Created: 2025-12-22 20:27:55 UTC

-- Insert admin users into user_roles table
-- Note: This should be run AFTER users have been created via auth.users
-- The user_id values below are placeholders and need to be updated with actual user IDs
-- from auth.users table after the users sign up

-- For manual setup, run this query in your Supabase SQL editor after users exist:
-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'admin'::app_role
-- FROM auth.users
-- WHERE email IN ('bmw.kojak@gmail.com', 'rgr-rs@hotmail.com')
-- ON CONFLICT (user_id, role) DO NOTHING;
