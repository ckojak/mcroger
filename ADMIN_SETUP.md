# Admin Setup Instructions

## Problem
The admin role is not being assigned to users correctly.

## Solution

### Option 1: Using the New Migration (Recommended)
If you're using Supabase CLI or can run migrations, the new migration file `20251223003900_fix_admin_user_assignment.sql` will:
1. Create a trigger to automatically assign admin role to specific emails when they sign up
2. Assign admin role to any existing users with those emails

To apply this migration:
```bash
supabase db push
```

### Option 2: Manual Fix via Supabase Dashboard
If you can't run migrations, follow these steps:

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Run the following query:

```sql
-- Assign admin role to specific users
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email IN ('bmw.kojak@gmail.com', 'rgr-rs@hotmail.com')
ON CONFLICT (user_id, role) DO NOTHING;
```

4. Verify the admin role was assigned:
```sql
SELECT u.email, ur.role
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email IN ('bmw.kojak@gmail.com', 'rgr-rs@hotmail.com');
```

### Option 3: Create Trigger for Future Users
To automatically assign admin role to these emails when they sign up in the future:

```sql
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

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created_assign_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_admin_role_by_email();
```

## Verification
After applying the fix, log out and log back in. The admin interface should now allow you to add articles and other content.

## Adding More Admin Users
To add additional admin emails, modify the email list in:
- The trigger function `assign_admin_role_by_email()`
- Run the INSERT query with the new email addresses
