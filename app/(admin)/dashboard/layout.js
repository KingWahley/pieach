// app/(admin)/dashboard/layout.js
import ThemeProvider from "@/components/layout/ThemeProvider";

export default function AdminLayout({ children }) {
  return (
    <ThemeProvider suppressHydrationWarning>
      <div className="dashboard-body min-h-screen bg-[var(--cream)] text-[var(--ink)] font-sans antialiased">
        {children}
      </div>
    </ThemeProvider>
  );
}
