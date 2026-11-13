"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
import { deleteCaseStudy, deleteInsight } from "@/lib/actions/editorial-action";

type EditorialKind = "case-studies" | "insights";
type Row = {
  id: string;
  name: string;
  slug: string;
  status: string;
  updatedAt: string;
  imagePath?: string;
};

function getImageSource(value: string | undefined) {
  const source = value?.trim() ?? "";
  if (/^\/?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  }
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return "/welcoming-moments.png";
}

export default function EditorialTable({
  kind,
  data,
}: {
  kind: EditorialKind;
  data: Row[];
}) {
  const [rows, setRows] = useState(data);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const label = kind === "case-studies" ? "case study" : "insight";

  const confirmDelete = async () => {
    if (!pendingId) return;
    setDeleting(true);
    const result = kind === "case-studies"
      ? await deleteCaseStudy(pendingId)
      : await deleteInsight(pendingId);
    setDeleting(false);
    if (!result.success) {
      toast.error(`Unable to delete ${label}`, { description: result.message });
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
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">
                {kind === "case-studies" ? "Image" : "URL"}
              </th>
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
                  {kind === "case-studies" ? (
                    <Link
                      href={`/${kind}/${row.slug}`}
                      target="_blank"
                      aria-label={`Open ${row.name}`}
                      className="relative block h-14 w-24 overflow-hidden rounded border bg-slate-100"
                    >
                      <Image
                        src={getImageSource(row.imagePath)}
                        alt=""
                        fill
                        unoptimized
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                  ) : (
                    <Link
                      href={`/${kind}/${row.slug}`}
                      target="_blank"
                      className="text-blue-700 hover:underline"
                    >
                      /{kind}/{row.slug}
                    </Link>
                  )}
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
                      <Link href={`/admin/${kind}/edit/${row.id}`}><Pencil className="mr-2 size-4" />Edit</Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setPendingId(row.id)}>
                      <Trash2 className="mr-2 size-4" />Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-500">No {kind} yet. Add one to publish it.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <AlertDialog open={pendingId !== null} onOpenChange={(open) => !open && !deleting && setPendingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this {label}?</AlertDialogTitle>
            <AlertDialogDescription>This removes its page and content. This cannot be undone.</AlertDialogDescription>
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
