import { MenuButton, PropsMenu } from "../components/MenuButton";

export function MenuView() {
  const fieldMenu: PropsMenu[] = [
    {
      title: "Navigation",
      path: "/worlds",
      bgPath: "bg-[url('/images/menu/copilot_room.jpeg')]",
    },
    {
      title: "Basement",
      path: "/",
      bgPath: "bg-[url('/images/menu/basement_hall_warship.jpeg')]",
    },
    {
      title: "Codex",
      path: "/codex",
      bgPath: "bg-[url('/images/menu/data_bank.jpeg')]",
    },
  ];

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden select-none">
        {fieldMenu.map((menu, index) => (
          <MenuButton
            key={index}
            title={menu.title}
            path={menu.path}
            bgPath={menu.bgPath}
          />
        ))}
      </div>
    </>
  );
}
