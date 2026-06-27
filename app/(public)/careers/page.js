// app/(public)/careers/page.js
import CareersPageContent from "@/components/sections/CareersPageContent";
import { createServerClient } from "@/lib/supabase/server";

export const revalidate = 60; // Revalidate every minute

export const metadata = {
  title: "Careers | PIEACH Limited",
  description: "Join the visionary design and management team at PIEACH Limited. Explore our open positions and career paths.",
};

export default async function CareersPage() {
  const supabase = createServerClient();

  // Fetch open vacancies from Supabase
  const { data: vacancies } = await supabase
    .from('vacancies')
    .select('*')
    .eq('status', 'Open');

  return <CareersPageContent vacancies={vacancies || []} />;
}
