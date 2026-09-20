import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteDetail } from "@/components/site/site-detail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: decodeURIComponent(slug) };
}

export default async function SiteDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();

  return (
    <div className="mx-auto max-w-[720px]">
      <SiteDetail
        name={decodeURIComponent(slug)}
        description="사이트 상세는 DB 연결 후 채워집니다."
        url="https://example.com"
        category="기타"
      />
    </div>
  );
}
