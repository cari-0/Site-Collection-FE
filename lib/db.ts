/**
 * Prisma 싱글톤은 DB 연결 때 여기에 둔다.
 * 기본 설정 단계에서는 클라이언트를 생성하지 않는다.
 */
export function getDb(): never {
  throw new Error("데이터베이스가 아직 연결되지 않았습니다. DATABASE_URL과 Prisma 생성을 이어서 하세요.");
}
