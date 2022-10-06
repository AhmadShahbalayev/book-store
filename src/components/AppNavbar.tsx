import { Navbar, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../common/routes";

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
        to={ROUTES.PAGINATED_BOOKS.MAIN}
        active={location.pathname === ROUTES.PAGINATED_BOOKS.MAIN}
      />
      <NavLink
        label="Infinite Scroll"
        component={Link}
        to={ROUTES.INFINITE_SCROLL}
        active={location.pathname === ROUTES.INFINITE_SCROLL}
      />
      <NavLink
        label="MACH Books"
        component={Link}
        to={ROUTES.MACH_BOOKS.MAIN}
        active={location.pathname === ROUTES.MACH_BOOKS.MAIN}
      />
    </Navbar>
  );
};
