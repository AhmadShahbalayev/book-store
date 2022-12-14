import { Footer } from "@mantine/core";

export const AppFooter: React.FC<{ copyright: string }> = ({ copyright }) => {
  return (
    <Footer height={60} p="md" data-testid="footer-copyright">
      &copy; {copyright}
    </Footer>
  );
};
