import { FC } from "react";

interface MainMenuItemProps {
  item: MenuItem;
}

const MainMenuItem: FC<MainMenuItemProps> = ({ item }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {item.icon}&nbsp;&nbsp;{item.label}
    </div>
  );
};

export default MainMenuItem;
