import { Container } from '@mellow-ui/react';
import { Sidebar, Header } from '@/components/layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <Container maxWidth="xl">
            {children}
          </Container>
        </div>
      </main>
    </div>
  );
}
