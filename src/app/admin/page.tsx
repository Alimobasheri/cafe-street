import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from './components/AdminDashboard';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }

  // Check if user has admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/admin/unauthorized');
  }

  // Fetch menu data
  const { data: menuSections, error: menuSectionsError } = await supabase
    .from('menu_sections')
    .select('*')
    .order('order');

  const { data: menuSubsections, error: menuSubsectionsError } = await supabase
    .from('menu_subsections')
    .select('*');

  const { data: menuItems, error: menuItemsError } = await supabase
    .from('menu_items')
    .select('*')
    .order('order_index');

  if (menuSectionsError || menuSubsectionsError || menuItemsError) {
    console.error('Error fetching data:', {
      menuSectionsError,
      menuSubsectionsError,
      menuItemsError,
    });
  }

  return (
    <AdminDashboard
      user={session.user}
      menuSections={menuSections || []}
      menuSubsections={menuSubsections || []}
      menuItems={menuItems || []}
    />
  );
}
