import { useState } from 'react';

export default function AddressCard({ address, onEdit, onDelete, onMakeDefault }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <div className="border border-gray-200 rounded-md p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {address.label && (
            <p className="text-sm font-semibold text-gray-900">
              {address.label}
            </p>
          )}
          <p className={`text-sm ${address.label ? 'text-gray-700 mt-1' : 'text-gray-900'}`}>
            {address.name}
          </p>
          <p className="text-sm text-gray-500 mt-1">{address.street}</p>
          <p className="text-sm text-gray-500">
            {address.city}, {address.postal}
          </p>
          <p className="text-sm text-gray-500">{address.province}</p>
          <p className="text-sm text-gray-500 mt-2">{address.phone}</p>
        </div>

        {address.isDefault && (
          <span className="text-[11px] font-medium text-gray-500 shrink-0">
            Default
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs">
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="text-gray-500 hover:text-black underline"
        >
          Edit
        </button>

        {!address.isDefault && (
          <button
            type="button"
            onClick={() => onMakeDefault(address.id)}
            className="text-gray-500 hover:text-black underline"
          >
            Make default
          </button>
        )}

        {confirmingDelete ? (
          <span className="flex items-center gap-2">
            <span className="text-gray-500">Delete this address?</span>
            <button
              type="button"
              onClick={() => onDelete(address.id)}
              className="text-brand hover:text-red-700 underline"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className="text-gray-500 hover:text-black underline"
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="text-gray-500 hover:text-brand underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}