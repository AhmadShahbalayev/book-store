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
      data-testid="navbar"
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
      <NavLink
        label="MACH Books"
        component={Link}
        to="/mach-books"
        active={location.pathname === "/mach-books"}
      />
    </Navbar>
  );
};
