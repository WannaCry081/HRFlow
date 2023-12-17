import {
  HamburgerMenuIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
} from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header className="w-full h-20 md:h-24">
      <div className="flex items-center h-full justify-between p-4 md:p-8">
        <span>
          <HamburgerMenuIcon className="w-8 h-8 md:hidden" />
        </span>
        <span className="flex space-x-4">
          <div className="h-12 w-12 rounded-full bg-zinc-100 shadow-lg flex items-center justify-center">
            <MoonIcon className="h-4 w-4" />
          </div>

          <div className="h-12 w-12 rounded-full bg-zinc-100 shadow-lg flex items-center justify-center">
            <BellIcon className="h-4 w-4" />
          </div>
        </span>
      </div>
    </header>
  );
};

export default Header;
