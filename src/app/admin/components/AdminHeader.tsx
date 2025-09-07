'use client';

import { User } from '@supabase/supabase-js';

interface AdminHeaderProps {
  user: User;
  onSignOut: () => void;
}

export default function AdminHeader({ user, onSignOut }: AdminHeaderProps) {
  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-right">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              پنل مدیریت کافه گیم استریت
            </h1>
            <p className="text-gray-400 text-sm">مدیریت منو، آیتم‌ها و بیشتر</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-right flex-1 sm:flex-initial">
              <p className="text-sm text-white">{user.email}</p>
              <p className="text-xs text-gray-400">مدیر سیستم</p>
            </div>

            <button
              onClick={onSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
            >
              خروج
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
