'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { MenuSection, MenuSubsection, MenuItem } from '@/db';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import AdminHeader from './AdminHeader';
import MenuSectionsManager from './MenuSectionsManagerMobile';
import MenuSubsectionsManager from './MenuSubsectionsManagerMobile';
import MenuItemsManager from './MenuItemsManagerMobile';
import '../admin.css';

interface AdminDashboardProps {
  user: User;
  menuSections: MenuSection[];
  menuSubsections: MenuSubsection[];
  menuItems: MenuItem[];
}

type TabType = 'sections' | 'subsections' | 'items';

export default function AdminDashboard({
  user,
  menuSections: initialSections,
  menuSubsections: initialSubsections,
  menuItems: initialItems,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('sections');
  const [menuSections, setMenuSections] = useState(initialSections);
  const [menuSubsections, setMenuSubsections] = useState(initialSubsections);
  const [menuItems, setMenuItems] = useState(initialItems);
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const refreshData = async () => {
    // Refresh menu data from the server
    const { data: sections } = await supabase
      .from('menu_sections')
      .select('*')
      .order('order');

    const { data: subsections } = await supabase
      .from('menu_subsections')
      .select('*');

    const { data: items } = await supabase
      .from('menu_items')
      .select('*')
      .order('order_index');

    if (sections) setMenuSections(sections);
    if (subsections) setMenuSubsections(subsections);
    if (items) setMenuItems(items);
  };

  return (
    <div className="admin-override">
      <AdminHeader user={user} onSignOut={handleSignOut} />

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex flex-wrap gap-2 sm:gap-8">
              <button
                onClick={() => setActiveTab('sections')}
                className={`py-2 px-3 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'sections'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                بخش‌های منو
              </button>
              <button
                onClick={() => setActiveTab('subsections')}
                className={`py-2 px-3 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'subsections'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                زیربخش‌ها
              </button>
              <button
                onClick={() => setActiveTab('items')}
                className={`py-2 px-3 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'items'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                آیتم‌های منو
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'sections' && (
          <MenuSectionsManager
            menuSections={menuSections}
            menuSubsections={menuSubsections}
            onDataChange={refreshData}
          />
        )}

        {activeTab === 'subsections' && (
          <MenuSubsectionsManager
            menuSections={menuSections}
            menuSubsections={menuSubsections}
            onDataChange={refreshData}
          />
        )}

        {activeTab === 'items' && (
          <MenuItemsManager
            menuItems={menuItems}
            menuSections={menuSections}
            menuSubsections={menuSubsections}
            onDataChange={refreshData}
          />
        )}
      </div>
    </div>
  );
}
