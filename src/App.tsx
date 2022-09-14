import { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

import { AppNavbar } from "./components/AppNavbar";
import { AppFooter } from "./components/AppFooter";
import { AppHeader } from "./components/AppHeader";

import { Paginated } from "./pages/Paginated";
import { InfiniteScroll } from "./pages/InfiniteScroll";
import { BookDetails } from "./pages/BookDetails";

import logo from "./assets/icons/logo.png";

export default function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
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
  );
}
