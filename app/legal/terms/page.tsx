import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-[720px] space-y-8 text-sm leading-relaxed">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">이용약관</h1>
        <p className="text-muted">시행일: 2026년 10월 4일</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">1. 서비스</h2>
        <p>
          {SITE_NAME}는 유익한 사이트를 모아 소개하는 큐레이션 서비스입니다. 검색 엔진이 아니며, 외부 사이트의
          운영·결제·배송·콘텐츠를 대신하지 않습니다.
        </p>
        <p>일반 회원가입은 없습니다. 관리자만 로그인할 수 있습니다.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">2. 이용</h2>
        <p>
          누구나 검색하고, 사이트 소개를 보고, 외부 사이트로 이동할 수 있습니다. 하트는 브라우저에 저장된 방문
          식별값으로만 구분하며, 회원 계정과 연결되지 않습니다.
        </p>
        <p>
          자동화 대량 요청, 서비스 방해, 허위 제보·광고 문의, 타인 사칭은 할 수 없습니다. 운영자는 이런 이용을
          제한하거나 기록을 삭제할 수 있습니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">3. 외부 사이트</h2>
        <p>
          {SITE_NAME}에 오른 사이트는 각 운영자가 따로 운영합니다. 해당 사이트의 정보 오류, 거래, 피해, 개인정보
          처리, 약관에 대해 {SITE_NAME}는 책임지지 않습니다. 바로가기는 이용자 선택으로 외부로 이동합니다.
        </p>
        <p>소개문과 분류는 운영자가 정리한 안내이며, 해당 사이트의 공식 설명이 아닙니다.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">4. 제보</h2>
        <p>
          이용자는 사이트를 제보할 수 있습니다. 연락처는 받지 않습니다. 제보는 등록 약속이 아니며, 운영자가 검토한
          뒤에만 공개됩니다. 품질이 낮거나 아래 금지 대상이면 올리지 않습니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">5. 광고</h2>
        <p>
          검색 결과 상단의 노란 카드는 광고입니다. 비용은 공개하지 않고 문의 후 협의합니다. 온라인 결제는 없습니다.
        </p>
        <p>
          광고를 받는다고 해서 그 사이트의 내용이나 거래를 {SITE_NAME}가 보증하지는 않습니다. 금지 대상이거나
          소개 품질이 부족하면 광고와 사이트 등록을 모두 거절할 수 있습니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">6. 금지 콘텐츠</h2>
        <p>{SITE_NAME}는 전 연령을 대상으로 하며, 아래 성격의 사이트는 제보·광고·등록을 받지 않습니다.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>성인, 도박, 불법 사행 행위</li>
          <li>피싱, 악성코드, 사기성 사이트</li>
          <li>불법 다운로드, 저작권 침해 배포</li>
          <li>허위 의료·투자 과장, 법령을 어기는 서비스</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">7. 지식재산</h2>
        <p>
          {SITE_NAME}의 이름, 화면, 소개문 작성물은 운영자에게 권리가 있습니다. 외부 사이트의 이름·로고·이미지는
          각 권리자에게 있습니다. 제보·광고 문의에 올린 내용은 서비스 소개와 검토를 위해 사용할 수 있습니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">8. 변경과 중단</h2>
        <p>
          운영자는 서비스를 고치거나 잠시 멈출 수 있습니다. 약관을 바꾸면 이 페이지에 시행일을 바꿔 알립니다. 계속
          이용하면 변경된 약관에 동의한 것으로 봅니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">9. 문의</h2>
        <p>
          약관 관련 문의는 광고 문의 페이지의 연락처로 남기면 됩니다. 본 약관은 대한민국 법을 따르며, 분쟁이 나면
          민사소송법상 관할 법원에 제기합니다.
        </p>
      </section>
    </article>
  );
}
