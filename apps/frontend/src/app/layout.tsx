import './globals.css'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-background">
          <main className="container mx-auto px-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
