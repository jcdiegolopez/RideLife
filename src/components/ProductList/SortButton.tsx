

type SortButtonProps = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean | null | string;
  onClick: () => void;
};

const SortButton = ({ label, icon: Icon, isActive, onClick }: SortButtonProps) => (
  <button
    onClick={onClick}
    className={`hover:scale-110 transition-transform duration-200 flex items-center gap-2 rounded-md px-4 py-2 text-white-custom ${isActive ? 'bg-accent-red' : 'bg-secondary-dark'}`}
  >
    <Icon className="text-white-custom" />
    <span>{label}</span>
  </button>
);

export default SortButton;