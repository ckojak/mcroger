-- Migration: Fix admin user assignment
-- Created: 2025-12-23 00:39:00 UTC
-- This migration properly assigns admin roles to specific users

-- First, ensure admin users exist and assign them the admin role
-- This will work after users have signed up via auth

-- Function to assign admin role to users by email
CREATE OR REPLACE FUNCTION public.assign_admin_role_by_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  -- Check if the new user's email is in the admin list
  IF NEW.email IN ('bmw.kojak@gmail.com', 'rgr-rs@hotmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to automatically assign admin role on user creation
DROP TRIGGER IF EXISTS on_auth_user_created_assign_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_admin_role_by_email();

-- Also assign admin role to existing users with these emails
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email IN ('bmw.kojak@gmail.com', 'rgr-rs@hotmail.com')
ON CONFLICT (user_id, role) DO NOTHING;
