import { SiteEditorForm } from "@/components/forms/site-editor-form";

export default function AdminNewSitePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">사이트 등록</h1>
      <SiteEditorForm />
    </section>
  );
}
