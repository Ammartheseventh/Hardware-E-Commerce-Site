import { useState } from 'react';
import { useAddressStore } from '../../store/useAddressStore';
import AddressForm from '../../components/account/AddressForm';
import AddressCard from '../../components/account/AddressCard';

const MAX_ADDRESSES = 3;

export default function AddressesPage() {
  const addresses = useAddressStore((s) => s.addresses);
  const addAddress = useAddressStore((s) => s.addAddress);
  const updateAddress = useAddressStore((s) => s.updateAddress);
  const removeAddress = useAddressStore((s) => s.removeAddress);
  const makeDefault = useAddressStore((s) => s.makeDefault);

  // null = no form open; 'new' = adding; otherwise an address id = editing
  const [editing, setEditing] = useState(null);

  const sorted = [...addresses].sort((a, b) =>
    a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
  );

  const canAdd = addresses.length < MAX_ADDRESSES;

  const handleAddSubmit = (data) => {
    addAddress(data);
    setEditing(null);
  };

  const handleEditSubmit = (data) => {
    updateAddress(editing, data);
    setEditing(null);
  };

  const handleDelete = (id) => {
    removeAddress(id);
    if (editing === id) setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Addresses</h1>

        {canAdd && editing !== 'new' && (
          <button
            type="button"
            onClick={() => setEditing('new')}
            className="text-sm text-gray-500 hover:text-black underline"
          >
            + Add address
          </button>
        )}
      </div>

      {editing === 'new' && (
        <div className="mb-6">
          <AddressForm
            onSubmit={handleAddSubmit}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {!canAdd && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md text-sm text-gray-500">
          You can save up to {MAX_ADDRESSES} addresses. Delete one to add
          another.
        </div>
      )}

      {addresses.length === 0 && editing !== 'new' && (
        <div className="border border-gray-200 rounded-md p-12 text-center">
          <p className="text-sm text-gray-500">
            You haven't saved any addresses yet.
          </p>
          <button
            type="button"
            onClick={() => setEditing('new')}
            className="inline-block mt-6 px-6 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
          >
            Add address
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {sorted.map((address) =>
          editing === address.id ? (
            <AddressForm
              key={address.id}
              initial={address}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={(a) => setEditing(a.id)}
              onDelete={handleDelete}
              onMakeDefault={makeDefault}
            />
          )
        )}
      </div>
    </div>
  );
}