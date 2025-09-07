# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for Game Street Cafe menu management.

## Prerequisites

1. A Supabase project with the existing menu tables (`menu_sections`, `menu_subsections`, `menu_items`)
2. Vercel deployment (optional, but recommended for production)
3. Admin user email address

## Setup Steps

### 1. Database Setup

1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Run the SQL script from `supabase-setup.sql` to:
   - Create the `profiles` table for user roles
   - Set up Row Level Security (RLS) policies
   - Create triggers for automatic profile creation
   - Add admin policies to existing menu tables

### 2. Create Admin User

1. First, sign up for an account using your admin email at `/admin/login`
2. After signing up, go to your Supabase dashboard > Authentication > Users
3. Find your user and copy the User ID
4. Go to SQL Editor and run:
   ```sql
   UPDATE profiles
   SET role = 'admin'
   WHERE id = 'your-user-id-here';
   ```

Alternatively, you can run:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

### 3. Environment Variables

Make sure your `.env.local` file contains:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Deploy and Test

1. Deploy your application to Vercel or your preferred hosting platform
2. Visit `/admin/login` and sign in with your admin account
3. You should now have access to the admin dashboard

## Features

### Admin Dashboard Tabs

1. **Menu Sections**: Manage main menu categories

   - Create, edit, delete sections
   - Set colors, order, and subsection flags
   - View section hierarchy

2. **Subsections**: Manage menu subsections

   - Only available for sections marked as having subsections
   - Create, edit, delete subsections
   - Assign to parent sections

3. **Menu Items**: Manage individual menu items
   - Create, edit, delete items
   - Assign to sections and subsections
   - Set prices and ordering
   - Filter by section

### Security Features

- **Authentication**: Supabase Auth with email/password
- **Authorization**: Role-based access control (only admin role can access)
- **Route Protection**: Middleware protects all `/admin` routes
- **Database Security**: Row Level Security (RLS) policies

### User Interface

- **Modern Dark Theme**: Consistent with the main app design
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Changes reflect immediately
- **Form Validation**: Client and server-side validation
- **Error Handling**: User-friendly error messages

## Database Schema

### Profiles Table

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Menu Tables (existing)

- `menu_sections`: Main menu categories
- `menu_subsections`: Sub-categories within sections
- `menu_items`: Individual menu items

## Troubleshooting

### Can't Access Admin Dashboard

1. Check if your user has the 'admin' role in the profiles table
2. Verify environment variables are set correctly
3. Check browser console for authentication errors

### Database Errors

1. Ensure RLS policies are set up correctly
2. Check that the profiles table exists
3. Verify foreign key relationships in menu tables

### Deployment Issues

1. Make sure environment variables are set in your hosting platform
2. Check build logs for any TypeScript or build errors
3. Verify that middleware is working correctly

## Development

To run locally:

```bash
npm run dev
```

Visit `http://localhost:3000/admin/login` to access the admin dashboard.

## Support

For issues or questions, please check:

1. Supabase dashboard for database errors
2. Browser console for client-side errors
3. Vercel logs for server-side errors

## Security Notes

- Never commit environment variables to version control
- Regularly review user roles and permissions
- Monitor admin access logs
- Use strong passwords for admin accounts
- Consider enabling 2FA in Supabase for additional security
