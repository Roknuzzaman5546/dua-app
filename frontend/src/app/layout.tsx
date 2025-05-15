import Topbar from '@/components/Topbar';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-[#f8fdfb]">
        <Sidebar />
        <div className="flex flex-col flex-1 min-h-screen">
          <Topbar></Topbar>
          <main className="p-4 overflow-y-auto h-[calc(100vh-64px)]">{children}</main>
        </div>
      </body>
    </html>
  );
}