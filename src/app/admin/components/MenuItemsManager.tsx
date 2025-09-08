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
  order_index?: number | null;
}

const initialFormData: ItemFormData = {
  section_id: 0,
  subsection_id: null,
  name: '',
  label: '',
  label_fn: '',
  price: 0,
  order_index: null,
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
  const [filterSection, setFilterSection] = useState<number | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        section_id: formData.section_id || null,
        subsection_id: formData.subsection_id || null,
      };

      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from('menu_items')
          .update(submitData)
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        // Create new item
        const { error } = await supabase
          .from('menu_items')
          .insert([submitData]);

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

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      section_id: item.section_id,
      subsection_id: item.subsection_id,
      name: item.name,
      label: item.label,
      label_fn: item.label_fn,
      price: item.price,
      order_index: item.order_index ?? null,
    });
    setShowForm(true);
  };

  const handleDelete = async (item: MenuItem) => {
    if (!confirm(`Are you sure you want to delete "${item.label}"?`)) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', item.id);

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
    setEditingItem(null);
    setShowForm(false);
    setError('');
  };

  const getAvailableSubsections = (sectionId: number) => {
    return menuSubsections.filter((sub) => sub.section_id === sectionId);
  };

  const getSectionName = (sectionId: number) => {
    const section = menuSections.find((s) => s.id === sectionId);
    return section ? section.label : 'Unknown';
  };

  const getSubsectionName = (subsectionId: number | null) => {
    if (!subsectionId) return 'None';
    const subsection = menuSubsections.find((s) => s.id === subsectionId);
    return subsection ? subsection.label : 'Unknown';
  };

  const filteredItems = filterSection
    ? menuItems.filter((item) => item.section_id === filterSection)
    : menuItems;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Menu Items</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New Item
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
          {menuSections.map((section) => (
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
              {editingItem ? 'Edit Item' : 'Add New Item'}
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
                      subsection_id: null, // Reset subsection when section changes
                    })
                  }
                >
                  <option value="">Select a section</option>
                  {menuSections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.section_id &&
                getAvailableSubsections(formData.section_id).length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Subsection
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
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
                      <option value="">No subsection</option>
                      {getAvailableSubsections(formData.section_id).map(
                        (subsection) => (
                          <option key={subsection.id} value={subsection.id}>
                            {subsection.label}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

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
                  Price (Toman) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
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
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Order Index
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  value={formData.order_index ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_index:
                        e.target.value === '' ? null : parseInt(e.target.value),
                    })
                  }
                />
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
                  {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Items Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Section
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Subsection
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
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700">
                <td className="px-4 py-4 text-sm text-gray-300">
                  {item.order_index || 0}
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {getSectionName(item.section_id)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {getSubsectionName(item.subsection_id)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-300">{item.name}</td>
                <td className="px-4 py-4 text-sm text-white">{item.label}</td>
                <td className="px-4 py-4 text-sm text-gray-300">
                  {item.label_fn}
                </td>
                <td className="px-4 py-4 text-sm text-green-400">
                  {formatPrice(item.price)}
                </td>
                <td className="px-4 py-4 text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
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

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No items found.{' '}
            {filterSection
              ? 'Try selecting a different section.'
              : 'Add your first menu item!'}
          </div>
        )}
      </div>
    </div>
  );
}
