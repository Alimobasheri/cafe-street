import Link from 'next/link';
import '../admin.css';

export default function Unauthorized() {
  return (
    <div className="admin-override flex items-center justify-center">
      <div className="max-w-md w-full mx-4 text-center space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-white">
            دسترسی مجاز نیست
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            شما اجازه دسترسی به پنل مدیریت را ندارید.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href="/admin/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            حساب کاربری دیگری امتحان کنید
          </Link>
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            بازگشت به منو
          </Link>
        </div>
      </div>
    </div>
  );
}
