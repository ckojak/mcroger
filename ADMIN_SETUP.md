# Admin Setup Instructions

## Problem
The admin role is not being assigned to users correctly.

## Important: Check if Migrations are Applied First!

Before following any solution below, check if the database schema is set up:

**Run this in Supabase SQL Editor:**
```sql
-- Check if app_role type exists
SELECT EXISTS (
  SELECT 1 FROM pg_type WHERE typname = 'app_role'
) AS type_exists;
```

- If result is `false`: **Go to Step 1 - Apply All Migrations**
- If result is `true`: **Go to Step 2 - Assign Admin Roles**

---

## Step 1: Apply All Migrations (If Database Schema Not Set Up)

If you get error `type "app_role" does not exist`, you need to apply the migrations first.

### Option A: Using Supabase CLI (Recommended)
```bash
supabase db push
```

### Option B: Manual Application via SQL Editor
Copy and paste ALL migration files in order in the Supabase SQL Editor:

1. **First**, run the entire content of: `supabase/migrations/20251222200446_8d16069f-7cc1-49c6-92bd-231a446230e0.sql`
2. **Then**, run: `supabase/migrations/20251223003900_fix_admin_user_assignment.sql`

After applying migrations, **go to Step 2**.

---

## Step 2: Assign Admin Roles (After Migrations are Applied)

### Quick Fix via Supabase Dashboard

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

**Expected result:** You should see your email with role 'admin'.

5. Log out and log back in to the admin panel.

---

## Verification
After applying the fix, log out and log back in. The admin interface should now allow you to add articles and other content.

## Adding More Admin Users
To add additional admin emails, run the INSERT query with the new email addresses:

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'new-admin@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

## Troubleshooting

### Error: "type 'app_role' does not exist"
This means the database migrations haven't been applied. Go back to **Step 1** and apply the migrations first.

### Error: "relation 'public.user_roles' does not exist"
Same as above - you need to apply the base migration first.

### Still can't add content after adding admin role
1. Make sure you logged out completely and logged back in
2. Verify your role in the database:
```sql
SELECT u.email, ur.role
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com';
```
