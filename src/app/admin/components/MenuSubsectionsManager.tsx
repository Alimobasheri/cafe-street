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
    label: 'Green',
    shadow: 'drop-shadow-dark-neon-green',
  },
  {
    value: 'text-dark-neon-pink',
    label: 'Pink',
    shadow: 'drop-shadow-dark-neon-pink',
  },
  {
    value: 'text-dark-neon-blue',
    label: 'Blue',
    shadow: 'drop-shadow-dark-neon-blue',
  },
  {
    value: 'text-dark-neon-yellow',
    label: 'Yellow',
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
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingSubsection) {
        // Update existing subsection
        const { error } = await supabase
          .from('menu_subsections')
          .update(formData)
          .eq('id', editingSubsection.id);

        if (error) throw error;
      } else {
        // Create new subsection
        const { error } = await supabase
          .from('menu_subsections')
          .insert([formData]);

        if (error) throw error;
      }

      resetForm();
      onDataChange();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
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
    if (!confirm(`Are you sure you want to delete "${subsection.label}"?`))
      return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('menu_subsections')
        .delete()
        .eq('id', subsection.id);

      if (error) throw error;
      onDataChange();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
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
    return section ? section.label : 'Unknown';
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Menu Subsections</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New Subsection
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filter by Section */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-300">
          Filter by Section:
        </label>
        <select
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          value={filterSection || ''}
          onChange={(e) =>
            setFilterSection(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">All Sections</option>
          {sectionsWithSubsections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">
              {editingSubsection ? 'Edit Subsection' : 'Add New Subsection'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Section *
                </label>
                <select
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.section_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      section_id: parseInt(e.target.value),
                    })
                  }
                >
                  <option value="">Select a section</option>
                  {sectionsWithSubsections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name (identifier) *
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
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Label (English) *
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
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Label (Persian) *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.label_fn}
                  onChange={(e) =>
                    setFormData({ ...formData, label_fn: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image Path (optional)
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
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Color Theme
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
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

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                  {loading
                    ? 'Saving...'
                    : editingSubsection
                    ? 'Update'
                    : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subsections Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Section
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Label
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Persian Label
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredSubsections.map((subsection) => (
              <tr key={subsection.id} className="hover:bg-gray-700">
                <td className="px-4 py-4 text-sm text-gray-300">
                  {getSectionName(subsection.section_id)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {subsection.name}
                </td>
                <td className="px-4 py-4 text-sm text-white">
                  <span className={subsection.label_color}>
                    {subsection.label}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {subsection.label_fn}
                </td>
                <td className="px-4 py-4 text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(subsection)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subsection)}
                    className="text-red-400 hover:text-red-300"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSubsections.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No subsections found.{' '}
            {filterSection
              ? 'Try selecting a different section.'
              : 'Add your first subsection!'}
          </div>
        )}
      </div>
    </div>
  );
}
