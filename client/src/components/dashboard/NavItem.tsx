import type { NavItemType } from "@/@types";

type PropsType = {
  item: NavItemType;
  isActiveItem: boolean;
  onItemClick: (id: string) => void;
  sidebarClosed: boolean;
  children?: React.ReactNode;
  // className?: string;
};

const NavItem = ({
  item,
  isActiveItem,
  onItemClick,
  sidebarClosed,
}: PropsType) => {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onItemClick(item.id)}
      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition duration-75 ${
        isActiveItem
          ? "bg-emerald-100 text-slate-800 shadow-gray-100"
          : "text-slate-600 hover:bg-emerald-100 hover:text-slate-800"
      } cursor-pointer group`}
    >
      <Icon
        className={`w-6 h-6 flex-shrink-0
        ${isActiveItem ? "text-emerald-500" : "text-slate-400"}`}
      />
      {!sidebarClosed && <span className="ml-3 truncate">{item.name}</span>}
    </button>
  );
};

export default NavItem;
