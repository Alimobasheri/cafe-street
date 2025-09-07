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
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingSection) {
        // Update existing section
        const { error } = await supabase
          .from('menu_sections')
          .update(formData)
          .eq('id', editingSection.id);

        if (error) throw error;
      } else {
        // Create new section
        const { error } = await supabase
          .from('menu_sections')
          .insert([formData]);

        if (error) throw error;
      }

      resetForm();
      onDataChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
    if (!confirm(`Are you sure you want to delete "${section.label}"?`)) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('menu_sections')
        .delete()
        .eq('id', section.id);

      if (error) throw error;
      onDataChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Menu Sections</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New Section
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">
              {editingSection ? 'Edit Section' : 'Add New Section'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name (identifier)
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
                  Label (English)
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
                  Label (Persian)
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="has_sub_sections"
                  className="mr-2"
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
                  Has sub-sections
                </label>
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
                  {loading ? 'Saving...' : editingSection ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sections Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Order
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
                Sub-sections
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {menuSections.map((section) => (
              <tr key={section.id} className="hover:bg-gray-700">
                <td className="px-4 py-4 text-sm text-gray-300">
                  {section.order}
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {section.name}
                </td>
                <td className="px-4 py-4 text-sm text-white">
                  <span className={section.label_color}>{section.label}</span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {section.label_fn}
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {section.has_sub_sections ? (
                    <span className="text-green-400">
                      {
                        menuSubsections.filter(
                          (sub) => sub.section_id === section.id
                        ).length
                      }{' '}
                      subsections
                    </span>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </td>
                <td className="px-4 py-4 text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(section)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(section)}
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
      </div>
    </div>
  );
}
