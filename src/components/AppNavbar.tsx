import { Navbar, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

export const AppNavbar: React.FC<{ opened: boolean }> = ({ opened }) => {
  const location = useLocation();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <NavLink
        label="Paginated"
        component={Link}
        to="/"
        active={location.pathname === "/"}
      />
      <NavLink
        label="Infinite Scroll"
        component={Link}
        to="/infinite-scroll"
        active={location.pathname === "/infinite-scroll"}
      />
    </Navbar>
  );
};
