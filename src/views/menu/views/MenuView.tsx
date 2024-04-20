import { MenuButton, PropsMenu } from "../components/MenuButton";

export function MenuView() {
  const fieldMenu: PropsMenu[] = [
    { title: "Navigation", path: "/worlds", bg: "copilot_room.jpeg" },
    { title: "Basement", path: "/", bg: "basement_hall_warship.jpeg" },
    { title: "Codex", path: "/codex", bg: "data_bank.jpeg" },
  ];

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden select-none">
        {fieldMenu.map((menu, index) => (
          <MenuButton
            key={index}
            title={menu.title}
            path={menu.path}
            bg={menu.bg}
          />
        ))}
      </div>
    </>
  );
}
