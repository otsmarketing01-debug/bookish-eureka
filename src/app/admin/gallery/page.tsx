"use client";
import { useEffect, useState, useCallback } from "react";
import { Loader2, RefreshCw, Plus, Trash2, Eye, EyeOff, Upload, X, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BeforeAfterSlider } from "@/components/site/before-after-slider";
import { toast } from "sonner";

type Item = {
  id: string;
  title: string;
  location: string;
  service: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  published: boolean;
  createdAt: string;
};

type FormState = {
  title: string;
  location: string;
  service: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  published: boolean;
};

const emptyForm: FormState = {
  title: "",
  location: "",
  service: "Curtain & Blind Cleaning",
  description: "",
  beforeImage: "",
  afterImage: "",
  published: true,
};

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const onFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Upload failed");
        return;
      }
      onChange(json.url);
      toast.success("Image uploaded");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {value ? (
        <div className="relative group">
          <img src={value} alt={label} className="h-28 w-full rounded-md border border-border object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-1 top-1 rounded-md bg-background/90 p-1 text-muted-foreground shadow-sm hover:text-destructive"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
          {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
          <span className="text-xs">{uploading ? "Uploading…" : "Click to upload"}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = "";
            }}
          />
        </label>
      )}
      <Input
        placeholder="…or paste an image URL"
        value={value.startsWith("/gallery/uploads/") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs"
      />
    </div>
  );
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    const json = await res.json();
    setItems(json.items ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const update = (k: keyof FormState, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.beforeImage || !form.afterImage) {
      toast.error("Title, before image, and after image are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Create failed");
        return;
      }
      toast.success("Showcase added");
      setForm(emptyForm);
      setShowForm(false);
      fetchItems();
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (id: string, published: boolean) => {
    await fetch(`/api/admin/gallery/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ published }),
    });
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, published } : i)));
    toast.success(published ? "Published" : "Unpublished");
  };

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Delete failed"); return; }
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Deleted");
  };

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Gallery Showcases</h1>
            <p className="text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? "s" : ""} · {items.filter((i) => i.published).length} published</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchItems} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button size="sm" onClick={() => setShowForm((s) => !s)}>
              <Plus className="mr-2 h-4 w-4" /> {showForm ? "Cancel" : "Add showcase"}
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Create form */}
          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base">New before/after showcase</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onCreate} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="title">Title *</Label>
                      <Input id="title" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Heavy lined living room drapes" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Sandton, JHB North" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="service">Service</Label>
                    <Input id="service" value={form.service} onChange={(e) => update("service", e.target.value)} placeholder="Curtain & Blind Cleaning" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe the job, the challenge, and the result…" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ImageUploadField label="Before image *" value={form.beforeImage} onChange={(url) => update("beforeImage", url)} />
                    <ImageUploadField label="After image *" value={form.afterImage} onChange={(url) => update("afterImage", url)} />
                  </div>
                  {form.beforeImage && form.afterImage && (
                    <div className="space-y-1.5">
                      <Label>Preview</Label>
                      <BeforeAfterSlider
                        beforeSrc={form.beforeImage}
                        afterSrc={form.afterImage}
                        beforeAlt="Before"
                        afterAlt="After"
                      />
                    </div>
                  )}
                  <label className="flex items-center gap-2.5 rounded-md border border-border p-3 cursor-pointer hover:bg-accent">
                    <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="h-4 w-4 accent-primary" />
                    <div>
                      <p className="text-sm font-medium">Published</p>
                      <p className="text-xs text-muted-foreground">Visible on the public gallery page</p>
                    </div>
                  </label>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={saving}>
                      {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                      Create showcase
                    </Button>
                    <Button type="button" variant="outline" onClick={() => { setShowForm(false); setForm(emptyForm); }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* List */}
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Images className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No showcases yet.</p>
              <p className="px-6 text-xs text-muted-foreground/70">Click "Add showcase" to upload your first before/after.</p>
              <p className="px-6 mt-2 text-xs text-muted-foreground/70">Note: the public gallery currently shows 3 default examples. Adding your own will replace them.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
                    <div className="w-full max-w-xs shrink-0">
                      <BeforeAfterSlider
                        beforeSrc={item.beforeImage}
                        afterSrc={item.afterImage}
                        beforeAlt={`${item.title} before`}
                        afterAlt={`${item.title} after`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Badge variant="outline">{item.service}</Badge>
                        {item.published ? (
                          <Badge className="bg-success/15 text-success hover:bg-success/15">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="ghost" size="icon" title={item.published ? "Unpublish" : "Publish"} onClick={() => toggle(item.id, !item.published)}>
                        {item.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => remove(item.id, item.title)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
