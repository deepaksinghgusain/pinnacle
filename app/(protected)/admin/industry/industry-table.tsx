"use client";

import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteIndustry } from "@/lib/actions/industry-action";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type IndustryRow = {
  id: string;
  name: string;
  slug: string;
  status: string;
  updatedAt: string;
};

export default function IndustryTable({ data }: { data: IndustryRow[] }) {
  const [rows, setRows] = useState(data);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!pendingId) return;
    setDeleting(true);
    const result = await deleteIndustry(pendingId);
    setDeleting(false);
    if (!result.success) {
      toast.error("Unable to delete industry", { description: result.message });
      return;
    }
    setRows((current) => current.filter((row) => row.id !== pendingId));
    setPendingId(null);
    toast.success(result.message);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Industry</th>
              <th className="px-5 py-3 font-semibold">URL</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Last updated</th>
              <th className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70">
                <td className="px-5 py-4 font-medium text-slate-900">{row.name}</td>
                <td className="px-5 py-4">
                  <Link href={`/industries/${row.slug}`} target="_blank" className="text-blue-700 hover:underline">
                    /industries/{row.slug}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${row.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {row.status === "ACTIVE" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">{new Date(row.updatedAt).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button asChild nativeButton={false} variant="outline" size="sm">
                      <Link href={`/admin/industry/edit/${row.id}`}><Pencil className="mr-2 size-4" />Edit</Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setPendingId(row.id)}>
                      <Trash2 className="mr-2 size-4" />Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-500">No industries yet. Add one to publish an industry page.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <AlertDialog open={pendingId !== null} onOpenChange={(open) => !open && !deleting && setPendingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this industry page?</AlertDialogTitle>
            <AlertDialogDescription>This removes the industry page and its content. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={deleting} onClick={(event) => {
              event.preventDefault();
              void confirmDelete();
            }}>
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
