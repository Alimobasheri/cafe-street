'use client';

import { useState } from 'react';
import { MenuSection, MenuSubsection } from '@/db';
import { createClient } from '@/utils/supabase/client';

interface MenuSubsectionsManagerProps {
  menuSections: MenuSection[];
  menuSubsections: MenuSubsection[];
  onDataChange: () => void;
}

interface SubsectionFormData {
  section_id: number;
  name: string;
  label: string;
  label_fn: string;
  image?: string;
  label_color: string;
  drop_shadow: string;
}

const initialFormData: SubsectionFormData = {
  section_id: 0,
  name: '',
  label: '',
  label_fn: '',
  image: '',
  label_color: 'text-dark-neon-green',
  drop_shadow: 'drop-shadow-dark-neon-green',
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

export default function MenuSubsectionsManager({
  menuSections,
  menuSubsections,
  onDataChange,
}: MenuSubsectionsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingSubsection, setEditingSubsection] =
    useState<MenuSubsection | null>(null);
  const [formData, setFormData] = useState<SubsectionFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterSection, setFilterSection] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingSubsection) {
        const { error } = await supabase
          .from('menu_subsections')
          .update(formData)
          .eq('id', editingSubsection.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_subsections')
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

  const handleEdit = (subsection: MenuSubsection) => {
    setEditingSubsection(subsection);
    setFormData({
      section_id: subsection.section_id,
      name: subsection.name,
      label: subsection.label,
      label_fn: subsection.label_fn,
      image: subsection.image || '',
      label_color: subsection.label_color,
      drop_shadow: subsection.drop_shadow,
    });
    setShowForm(true);
  };

  const handleDelete = async (subsection: MenuSubsection) => {
    if (deleteConfirm !== subsection.id) {
      setDeleteConfirm(subsection.id);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('menu_subsections')
        .delete()
        .eq('id', subsection.id);

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
    setEditingSubsection(null);
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

  const getSectionName = (sectionId: number) => {
    const section = menuSections.find((s) => s.id === sectionId);
    return section ? section.label_fn : 'نامشخص';
  };

  const filteredSubsections = filterSection
    ? menuSubsections.filter(
        (subsection) => subsection.section_id === filterSection
      )
    : menuSubsections;

  const sectionsWithSubsections = menuSections.filter(
    (section) => section.has_sub_sections
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-white">زیربخش‌های منو</h2>
        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          افزودن زیربخش جدید
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded text-right">
          {error}
        </div>
      )}

      {/* Filter by Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label className="text-sm font-medium text-gray-300 whitespace-nowrap">
          فیلتر بر اساس بخش:
        </label>
        <select
          className="w-full sm:w-auto px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-right"
          value={filterSection || ''}
          onChange={(e) =>
            setFilterSection(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">همه بخش‌ها</option>
          {sectionsWithSubsections.map((section) => (
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
              {editingSubsection ? 'ویرایش زیربخش' : 'افزودن زیربخش جدید'}
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
                    })
                  }
                >
                  <option value="">انتخاب بخش</option>
                  {sectionsWithSubsections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.label_fn}
                    </option>
                  ))}
                </select>
              </div>

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
                    : editingSubsection
                    ? 'بروزرسانی'
                    : 'ایجاد'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile-Optimized Subsections List */}
      <div className="space-y-4">
        {filteredSubsections.map((subsection) => (
          <div
            key={subsection.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 text-right">
                <div className="mb-2">
                  <h3
                    className={`font-medium text-lg ${subsection.label_color}`}
                  >
                    {subsection.label_fn}
                  </h3>
                  <p className="text-gray-400 text-sm">{subsection.label}</p>
                </div>

                <div className="text-sm text-gray-400 space-y-1">
                  <div>بخش: {getSectionName(subsection.section_id)}</div>
                  <div>شناسه: {subsection.name}</div>
                  {subsection.image && <div>تصویر: {subsection.image}</div>}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(subsection)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDelete(subsection)}
                disabled={loading}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  deleteConfirm === subsection.id
                    ? 'bg-red-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {deleteConfirm === subsection.id ? 'تایید حذف؟' : 'حذف'}
              </button>
            </div>
          </div>
        ))}

        {filteredSubsections.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            زیربخشی یافت نشد.{' '}
            {filterSection
              ? 'بخش دیگری را انتخاب کنید.'
              : 'اولین زیربخش را اضافه کنید!'}
          </div>
        )}
      </div>
    </div>
  );
}
