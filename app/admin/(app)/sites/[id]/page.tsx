import { SiteEditorForm } from "@/components/forms/site-editor-form";

export default async function AdminEditSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">사이트 수정</h1>
      <p className="text-sm text-muted">id: {id}</p>
      <SiteEditorForm />
    </section>
  );
}
