import { connection } from "next/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditorialTable from "../editorial-table";
import { listCaseStudies } from "@/lib/editorial-data";

export default async function CaseStudiesAdminPage() {
  await connection();
  const result = await listCaseStudies();
  if (!result.success) {
    return <DatabaseError title="Case studies could not be loaded" message={result.message} />;
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold text-slate-950">Case Studies</h1><p className="mt-1 text-sm text-slate-600">Manage case study pages and engagement outcomes.</p></div>
        <Button asChild nativeButton={false}><Link href="/admin/case-studies/create"><Plus className="mr-2 size-4" />Add case study</Link></Button>
      </div>
      <EditorialTable kind="case-studies" data={result.data.map(({ id, name, slug, status, updatedAt }) => ({ id, name, slug, status, updatedAt: updatedAt.toISOString() }))} />
    </div>
  );
}

function DatabaseError({ title, message }: { title: string; message: string }) {
  return <div className="space-y-2 rounded-xl border border-red-200 bg-red-50 p-5 text-red-950"><h1 className="text-lg font-semibold">{title}</h1><p className="text-sm">{message}</p></div>;
}
