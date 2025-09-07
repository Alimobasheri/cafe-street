'use client';

import { useState } from 'react';
import { MenuSection, MenuSubsection } from '@/db';
import { createClient } from '@/utils/supabase/client';

interface MenuSectionsManagerProps {
  menuSections: MenuSection[];
  menuSubsections: MenuSubsection[];
  onDataChange: () => void;
}

interface SectionFormData {
  name: string;
  label: string;
  label_fn: string;
  image?: string;
  label_color: string;
  drop_shadow: string;
  has_sub_sections: boolean;
  order: number;
}

const initialFormData: SectionFormData = {
  name: '',
  label: '',
  label_fn: '',
  image: '',
  label_color: 'text-dark-neon-green',
  drop_shadow: 'drop-shadow-dark-neon-green',
  has_sub_sections: false,
  order: 0,
};

const colorOptions = [
  {
    value: 'text-dark-neon-green',
    label: 'سبز',
    shadow: 'drop-shadow-dark-neon-green',
  },
  {
    value: 'text-dark-neon-pink',
    label: 'صورتی',
    shadow: 'drop-shadow-dark-neon-pink',
  },
  {
    value: 'text-dark-neon-blue',
    label: 'آبی',
    shadow: 'drop-shadow-dark-neon-blue',
  },
  {
    value: 'text-dark-neon-yellow',
    label: 'زرد',
    shadow: 'drop-shadow-dark-neon-yellow',
  },
];

export default function MenuSectionsManager({
  menuSections,
  menuSubsections,
  onDataChange,
}: MenuSectionsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState<MenuSection | null>(
    null
  );
  const [formData, setFormData] = useState<SectionFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingSection) {
        const { error } = await supabase
          .from('menu_sections')
          .update(formData)
          .eq('id', editingSection.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_sections')
          .insert([formData]);

        if (error) throw error;
      }

      resetForm();
      onDataChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داده است');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section: MenuSection) => {
    setEditingSection(section);
    setFormData({
      name: section.name,
      label: section.label,
      label_fn: section.label_fn,
      image: section.image || '',
      label_color: section.label_color,
      drop_shadow: section.drop_shadow,
      has_sub_sections: section.has_sub_sections,
      order: section.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (section: MenuSection) => {
    if (deleteConfirm !== section.id) {
      setDeleteConfirm(section.id);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('menu_sections')
        .delete()
        .eq('id', section.id);

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
    setEditingSection(null);
    setShowForm(false);
    setError('');
  };

  const handleColorChange = (color: string) => {
    const colorOption = colorOptions.find((opt) => opt.value === color);
    setFormData({
      ...formData,
      label_color: color,
      drop_shadow: colorOption?.shadow || 'drop-shadow-dark-neon-green',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-white">بخش‌های منو</h2>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          افزودن بخش جدید
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded text-right">
          {error}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4 text-right">
              {editingSection ? 'ویرایش بخش' : 'افزودن بخش جدید'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  مسیر تصویر (اختیاری)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                  تم رنگی
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
                  value={formData.label_color}
                  onChange={(e) => handleColorChange(e.target.value)}
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 text-right">
                  ترتیب نمایش *
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="has_sub_sections"
                  className="rounded"
                  checked={formData.has_sub_sections}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      has_sub_sections: e.target.checked,
                    })
                  }
                />
                <label
                  htmlFor="has_sub_sections"
                  className="text-sm text-gray-300"
                >
                  دارای زیربخش
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  {loading
                    ? 'در حال ذخیره...'
                    : editingSection
                    ? 'بروزرسانی'
                    : 'ایجاد'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile-Optimized Sections List */}
      <div className="space-y-4">
        {menuSections.map((section) => (
          <div
            key={section.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 text-right">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-right">
                    <h3
                      className={`font-medium text-lg ${section.label_color}`}
                    >
                      {section.label_fn}
                    </h3>
                    <p className="text-gray-400 text-sm">{section.label}</p>
                  </div>
                  <div className="text-left">
                    <span className="text-blue-400 font-bold text-lg">
                      #{section.order}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-400 space-y-1">
                  <div>شناسه: {section.name}</div>
                  <div>
                    زیربخش‌ها:{' '}
                    {section.has_sub_sections ? (
                      <span className="text-green-400">
                        {
                          menuSubsections.filter(
                            (sub) => sub.section_id === section.id
                          ).length
                        }{' '}
                        زیربخش
                      </span>
                    ) : (
                      <span className="text-gray-500">ندارد</span>
                    )}
                  </div>
                  {section.image && <div>تصویر: {section.image}</div>}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(section)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDelete(section)}
                disabled={loading}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  deleteConfirm === section.id
                    ? 'bg-red-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {deleteConfirm === section.id ? 'تایید حذف؟' : 'حذف'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
