import { useToastStore } from '../../store/useToastStore';

export default function Toast() {
  const message = useToastStore((state) => state.message);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-black text-white text-sm px-4 py-3 rounded-md shadow-lg animate-[fadeIn_0.2s_ease-out]">
      {message}
    </div>
  );
}