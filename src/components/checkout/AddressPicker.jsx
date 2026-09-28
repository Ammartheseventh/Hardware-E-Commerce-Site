import { useAddressStore } from '../../store/useAddressStore';

export function addressesMatch(a, b) {
  if (!a || !b) return false;
  return (
    a.street === b.street &&
    a.city === b.city &&
    a.province === b.province &&
    a.postal === b.postal
  );
}

export default function AddressPicker({ selectedId, onSelect, onSelectNew }) {
  const addresses = useAddressStore((s) => s.addresses);

  if (addresses.length === 0) return null;

  const sorted = [...addresses].sort((a, b) =>
    a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
  );

  return (
    <section className="mb-8">
      <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
        Saved addresses
      </h2>

      <div className="flex flex-col gap-3">
        {sorted.map((address) => {
          const isSelected = selectedId === address.id;
          return (
            <button
              key={address.id}
              type="button"
              onClick={() => onSelect(address)}
              className={`w-full text-left p-4 border rounded-md transition-colors ${
                isSelected
                  ? 'border-black bg-gray-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-black' : 'border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-black" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    {address.label && (
                      <p className="text-sm font-medium text-gray-900">
                        {address.label}
                      </p>
                    )}
                    {address.isDefault && (
                      <span className="text-[11px] text-gray-500">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-700 mt-1">
                    {address.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {address.street}
                  </p>
                  <p className="text-xs text-gray-500">
                    {address.city}, {address.postal}
                  </p>
                  <p className="text-xs text-gray-500">
                    {address.province}
                  </p>
                </div>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={onSelectNew}
          className={`w-full text-left p-4 border rounded-md transition-colors ${
            selectedId === 'new'
              ? 'border-black bg-gray-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                selectedId === 'new' ? 'border-black' : 'border-gray-300'
              }`}
            >
              {selectedId === 'new' && (
                <span className="w-2 h-2 rounded-full bg-black" />
              )}
            </span>
            <span className="text-sm font-medium text-gray-900">
              Use a different address
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}