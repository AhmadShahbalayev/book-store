import { useEffect, useState } from "react";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { Route, Routes, useLocation } from "react-router-dom";

import { AppNavbar } from "./components/AppNavbar";
import { AppFooter } from "./components/AppFooter";
import { AppHeader } from "./components/AppHeader";

import { Paginated } from "./pages/Paginated";
import { InfiniteScroll } from "./pages/InfiniteScroll";
import { BookDetails } from "./pages/BookDetails";

import logo from "./assets/logo.png";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./libraries/apollo";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libraries/react-query";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

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

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
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
                <Route path="/" element={<Paginated />} />
                <Route path="/infinite-scroll" element={<InfiniteScroll />} />
                <Route path="/:url" element={<BookDetails />} />
              </Routes>
            </AppShell>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
