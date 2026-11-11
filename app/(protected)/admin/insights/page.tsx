import { connection } from "next/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditorialTable from "../editorial-table";
import { listInsights } from "@/lib/editorial-data";

export default async function InsightsAdminPage() {
  await connection();
  const result = await listInsights();
  if (!result.success) {
    return <div className="space-y-2 rounded-xl border border-red-200 bg-red-50 p-5 text-red-950"><h1 className="text-lg font-semibold">Insights could not be loaded</h1><p className="text-sm">{result.message}</p></div>;
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-2xl font-bold text-slate-950">Insights</h1><p className="mt-1 text-sm text-slate-600">Manage thought leadership and insight pages.</p></div>
        <Button asChild nativeButton={false}><Link href="/admin/insights/create"><Plus className="mr-2 size-4" />Add insight</Link></Button>
      </div>
      <EditorialTable kind="insights" data={result.data.map(({ id, name, slug, status, updatedAt }) => ({ id, name, slug, status, updatedAt: updatedAt.toISOString() }))} />
    </div>
  );
}
