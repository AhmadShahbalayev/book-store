import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { ApolloProvider } from "@apollo/client";
import { QueryClientProvider } from "@tanstack/react-query";

import { AppNavbar } from "./components/AppNavbar";
import { AppFooter } from "./components/AppFooter";
import { AppHeader } from "./components/AppHeader";

import { Paginated } from "./pages/Paginated";
import { InfiniteScroll } from "./pages/InfiniteScroll";
import { BookDetails } from "./pages/BookDetails";

import { apolloClient } from "./libraries/apollo";
import { queryClient } from "./libraries/react-query";

import logo from "./assets/logo.png";
import { MachBooks } from "./pages/MachBooks";
import { MachBookDetails } from "./pages/MachBookDetails";
import { ROUTES } from "./common/routes";

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setOpened(false);
  }, [location.pathname]);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme, cursorType: "pointer" }}
            withGlobalStyles
            withNormalizeCSS
          >
            <AppShell
              navbarOffsetBreakpoint="sm"
              header={
                <AppHeader
                  opened={opened}
                  setOpened={() => setOpened((o) => !o)}
                  burgerColor={theme.colors.gray[6]}
                  imgPath={logo}
                  title="Book Store"
                />
              }
              navbar={<AppNavbar opened={opened} />}
              footer={<AppFooter copyright="Ahmad Shahbalayev" />}
            >
              <Routes>
                <Route
                  path={ROUTES.PAGINATED_BOOKS.MAIN}
                  element={<Paginated />}
                />
                <Route
                  path={ROUTES.INFINITE_SCROLL}
                  element={<InfiniteScroll />}
                />
                <Route
                  path={ROUTES.PAGINATED_BOOKS.DETAILS}
                  element={<BookDetails />}
                />
                <Route path={ROUTES.MACH_BOOKS.MAIN} element={<MachBooks />} />
                <Route
                  path={ROUTES.MACH_BOOKS.DETAILS}
                  element={<MachBookDetails />}
                />
              </Routes>
            </AppShell>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
