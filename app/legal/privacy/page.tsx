import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: "개인정보 처리방침" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[720px] space-y-8 text-sm leading-relaxed">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">개인정보 처리방침</h1>
        <p className="text-muted">시행일: 2026년 10월 4일</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">1. 기본</h2>
        <p>
          {SITE_NAME}는 일반 회원가입이 없습니다. 검색과 사이트 열람만으로 이름·이메일·전화번호를 받지 않습니다.
          개인정보에 가까운 값은 광고 문의 연락처와, 부정 이용을 막기 위한 접속 정보뿐입니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. 수집하는 정보</h2>
        <div className="space-y-2">
          <h3 className="font-medium">사이트 제보</h3>
          <p>
            사이트 이름, 주소, 소개, 키워드를 받습니다. 제보자 연락처는 받지 않습니다. 짧은 시간에 같은 곳에서 많이
            보내면 막기 위해 접속 주소를 해시로만 저장할 수 있습니다. 원래 IP는 보관하지 않습니다.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">광고 문의</h3>
          <p>
            사이트 이름, 주소, 소개, 희망 키워드, 희망 기간, 이메일 또는 전화번호, 선택 이미지를 받습니다. 연락처는
            광고 협의에만 씁니다. 문의 시 이 목적에 동의해야 합니다. 접속 주소는 남용 방지용으로 해시만 남길 수
            있습니다.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">하트·검색·바로가기</h3>
          <p>
            하트는 브라우저에 두는 방문 식별값으로 중복을 가립니다. 검색어와 사이트 열람은 인기 검색어·최근 연 사이트
            안내에 쓰이며, 접속 주소는 해시로만 남길 수 있습니다. 회원 프로필과 연결하지 않습니다.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">관리자</h3>
          <p>운영자 로그인에 이메일과 비밀번호(암호화)를 씁니다. 일반 이용자 계정이 아닙니다.</p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">3. 이용 목적</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>사이트 소개와 검색 결과 제공</li>
          <li>제보·광고 문의 검토</li>
          <li>광고 협의 연락 (문의하신 분에 한함)</li>
          <li>남용·부정 요청 차단</li>
          <li>지금 많이 찾는 검색어, 방금 열어본 사이트 안내</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">4. 보유</h2>
        <p>
          광고 문의 연락처는 협의가 끝나거나 거절된 뒤, 추가 연락이 필요 없다고 보면 삭제합니다. 분쟁이나 부정 이용
          확인이 있으면 필요한 동안만 더 둘 수 있습니다.
        </p>
        <p>
          제보 내용과 공개 사이트 소개는 서비스 운영을 위해 둡니다. 검색·열람 기록은 집계에 쓰인 뒤 오래된 것은 지울
          수 있습니다. 하트 식별값은 이용자가 브라우저 저장 정보를 지우면 사라집니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">5. 제공과 처리 위탁</h2>
        <p>
          이용자 연락처를 광고나 마케팅으로 팔거나 넘기지 않습니다. 호스팅, 데이터베이스, 이미지 저장처럼 서비스를
          돌리는 데 필요한 범위에서만 처리 위탁이 있을 수 있습니다.
        </p>
        <p>법령에 따른 요청이 있으면 그에 맞게 제공할 수 있습니다.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">6. 쿠키와 로컬 저장</h2>
        <p>
          로그인 쿠키는 관리자 화면에만 씁니다. 일반 이용자에게는 하트용 방문 식별값을 브라우저 로컬 저장소에 둡니다.
          필수 동작에만 쓰며, 광고 네트워크 추적은 하지 않습니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">7. 이용자 권리</h2>
        <p>
          광고 문의로 연락처를 남긴 분은 열람·정정·삭제를 요청할 수 있습니다. 제보는 연락처가 없어 본인 확인이 어려운
          경우가 있습니다. 공개된 사이트 소개 수정은 운영자가 검토합니다.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">8. 문의</h2>
        <p>
          개인정보 관련 요청은 광고 문의 페이지로 보내 주세요. 처리방침을 바꾸면 이 페이지의 시행일을 고쳐 알립니다.
        </p>
      </section>
    </article>
  );
}
