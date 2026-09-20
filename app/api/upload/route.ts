import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "이미지 업로드는 관리자 세션 연결 후 구현합니다." }, { status: 501 });
}
