import type { Metadata } from "next";
import Link from "next/link";
import { nameFromSlug } from "@/lib/keywords";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = nameFromSlug(slug);
  return {
    title: name,
    description: `${name}에 맞는 사이트를 모았습니다.`,
  };
}

export default async function KeywordLandingPage({ params }: Props) {
  const { slug } = await params;
  const name = nameFromSlug(slug);

  return (
    <section className="mx-auto max-w-[800px] space-y-6">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p className="text-muted">검색 결과는 DB 연결 후 표시됩니다.</p>
      <p>
        <Link href="/submit" className="text-point underline">
          관련 사이트를 제보하기
        </Link>
      </p>
    </section>
  );
}
