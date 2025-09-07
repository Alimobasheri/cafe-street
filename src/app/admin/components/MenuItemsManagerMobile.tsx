'use client';

import { useState } from 'react';
import { MenuItem, MenuSection, MenuSubsection } from '@/db';
import { createClient } from '@/utils/supabase/client';

interface MenuItemsManagerProps {
  menuItems: MenuItem[];
  menuSections: MenuSection[];
  menuSubsections: MenuSubsection[];
  onDataChange: () => void;
}

interface ItemFormData {
  section_id: number;
  subsection_id: number | null;
  name: string;
  label: string;
  label_fn: string;
  price: number;
  order_index?: number;
}

const initialFormData: ItemFormData = {
  section_id: 0,
  subsection_id: null,
  name: '',
  label: '',
  label_fn: '',
  price: 0,
  order_index: 0,
};

export default function MenuItemsManager({
  menuItems,
  menuSections,
  menuSubsections,
  onDataChange,
}: MenuItemsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<ItemFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterSection, setFilterSection] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (
        !formData.section_id ||
        !formData.name ||
        !formData.label ||
        !formData.label_fn ||
        !formData.price
      ) {
        throw new Error('لطفا همه فیلدهای اجباری را پر کنید');
      }

      const submitData = {
        section_id: formData.section_id,
        subsection_id: formData.subsection_id || null,
        name: formData.name.trim(),
        label: formData.label.trim(),
        label_fn: formData.label_fn.trim(),
        price: Number(formData.price),
        order_index: formData.order_index || 0,
      };

      console.log('Submitting data:', submitData);
      console.log('Editing item:', editingItem);

      if (editingItem) {
        const { data, error } = await supabase
          .from('menu_items')
          .update(submitData)
          .eq('id', editingItem.id)
          .select();

        console.log('Update result:', { data, error });

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
      } else {
        const { data, error } = await supabase
          .from('menu_items')
          .insert([submitData])
          .select();

        console.log('Insert result:', { data, error });

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
      }

      setSuccess(
        editingItem
          ? 'آیتم با موفقیت بروزرسانی شد'
          : 'آیتم جدید با موفقیت اضافه شد'
      );
      resetForm();
      onDataChange();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : 'خطایی رخ داده است');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      section_id: item.section_id,
      subsection_id: item.subsection_id,
      name: item.name,
      label: item.label,
      label_fn: item.label_fn,
      price: item.price,
      order_index: item.order_index || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (item: MenuItem) => {
    if (deleteConfirm !== item.id) {
      setDeleteConfirm(item.id);
      setTimeout(() => setDeleteConfirm(null), 3000); // Reset after 3 seconds
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;
      setDeleteConfirm(null);
      onDataChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داده است');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingItem(null);
    setShowForm(false);
    setError('');
    setSuccess('');
  };

  const getAvailableSubsections = (sectionId: number) => {
    return menuSubsections.filter((sub) => sub.section_id === sectionId);
  };

  const getSectionName = (sectionId: number) => {
    const section = menuSections.find((s) => s.id === sectionId);
    return section ? section.label_fn : 'نامشخص';
  };

  const getSubsectionName = (subsectionId: number | null) => {
    if (!subsectionId) return 'ندارد';
    const subsection = menuSubsections.find((s) => s.id === subsectionId);
    return subsection ? subsection.label_fn : 'نامشخص';
  };

  const filteredItems = filterSection
    ? menuItems.filter((item) => item.section_id === filterSection)
    : menuItems;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-white">آیتم‌های منو</h2>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          افزودن آیتم جدید
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Filter by Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label className="text-sm font-medium text-gray-300 whitespace-nowrap">
          فیلتر بر اساس بخش:
        </label>
        <select
          className="w-full sm:w-auto px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          value={filterSection || ''}
          onChange={(e) =>
            setFilterSection(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">همه بخش‌ها</option>
          {menuSections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label_fn}
            </option>
          ))}
        </select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4 text-right">
              {editingItem ? 'ویرایش آیتم' : 'افزودن آیتم جدید'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                  بخش *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
                  value={formData.section_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      section_id: parseInt(e.target.value),
                      subsection_id: null,
                    })
                  }
                >
                  <option value="">انتخاب بخش</option>
                  {menuSections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.label_fn}
                    </option>
                  ))}
                </select>
              </div>

              {formData.section_id &&
                getAvailableSubsections(formData.section_id).length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                      زیربخش
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
                      value={formData.subsection_id || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subsection_id: e.target.value
                            ? parseInt(e.target.value)
                            : null,
                        })
                      }
                    >
                      <option value="">بدون زیربخش</option>
                      {getAvailableSubsections(formData.section_id).map(
                        (subsection) => (
                          <option key={subsection.id} value={subsection.id}>
                            {subsection.label_fn}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                  نام شناسه (انگلیسی) *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                  نام انگلیسی *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                  نام فارسی *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
                  value={formData.label_fn}
                  onChange={(e) =>
                    setFormData({ ...formData, label_fn: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                  قیمت (تومان) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                  ترتیب نمایش
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
                  value={formData.order_index || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_index: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              {error && (
                <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded text-right text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300 disabled:opacity-50"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {loading
                    ? 'در حال ذخیره...'
                    : editingItem
                    ? 'بروزرسانی'
                    : 'ایجاد'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile-Optimized Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 text-right">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-right">
                    <h3 className="text-white font-medium text-lg">
                      {item.label_fn}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                  </div>
                  <div className="text-left">
                    <span className="text-green-400 font-bold text-lg">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-400 space-y-1">
                  <div>بخش: {getSectionName(item.section_id)}</div>
                  <div>زیربخش: {getSubsectionName(item.subsection_id)}</div>
                  <div>شناسه: {item.name}</div>
                  <div>ترتیب: {item.order_index || 0}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDelete(item)}
                disabled={loading}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  deleteConfirm === item.id
                    ? 'bg-red-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {deleteConfirm === item.id ? 'تایید حذف؟' : 'حذف'}
              </button>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            آیتمی یافت نشد.{' '}
            {filterSection
              ? 'بخش دیگری را انتخاب کنید.'
              : 'اولین آیتم منو را اضافه کنید!'}
          </div>
        )}
      </div>
    </div>
  );
}
