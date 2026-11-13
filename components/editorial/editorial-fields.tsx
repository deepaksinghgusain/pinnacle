"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EditorialItem } from "@/lib/editorial-content";

export { default as EditorialImageUpload } from "@/components/shared/ImageUploadField";

export function EditorialTextInput({
  label,
  value,
  onChange,
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

export function EditorialTextArea({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="min-h-28"
      />
    </div>
  );
}

export function EditorialItemEditor({
  title,
  items,
  onChange,
  withSource = false,
}: {
  title: string;
  items: EditorialItem[];
  onChange: (items: EditorialItem[]) => void;
  withSource?: boolean;
}) {
  const update = (index: number, patch: Partial<EditorialItem>) => {
    onChange(
      items.map((item, current) =>
        current === index ? { ...item, ...patch } : item,
      ),
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{title}</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            onChange([
              ...items,
              { title: "", description: "", ...(withSource ? { source: "" } : {}) },
            ])
          }
        >
          <Plus className="mr-2 size-4" />
          Add item
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{title} {index + 1}</p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Remove ${title} ${index + 1}`}
              onClick={() => onChange(items.filter((_, current) => current !== index))}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          <EditorialTextInput
            label={`${title} ${index + 1} title`}
            value={item.title}
            onChange={(value) => update(index, { title: value })}
            required
          />
          <EditorialTextArea
            label={`${title} ${index + 1} description`}
            value={item.description}
            onChange={(value) => update(index, { description: value })}
          />
          {withSource ? (
            <EditorialTextInput
              label={`${title} ${index + 1} source URL`}
              value={item.source ?? ""}
              onChange={(value) => update(index, { source: value })}
              placeholder="https://..."
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
