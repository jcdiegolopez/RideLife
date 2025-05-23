import type { FilterButtonProps } from "../../utils/types";


const ClearSearchButton = ({ onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className="hover:scale-110 transition-transform duration-200 flex items-center gap-2 bg-white-custom/20 rounded-md px-4 py-2 text-white-custom"
  >
    <span>Clear Search</span>
  </button>
);

export default ClearSearchButton;