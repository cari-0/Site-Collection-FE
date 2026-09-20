export type AdminSession = {
  email: string;
};

export async function getAdmin(): Promise<AdminSession | null> {
  return null;
}

export async function requireAdmin(): Promise<AdminSession> {
  const admin = await getAdmin();
  if (!admin) {
    throw new Error("관리자 로그인이 필요합니다.");
  }
  return admin;
}

export async function login(_email: string, _password: string): Promise<boolean> {
  return false;
}

export async function logout(): Promise<void> {}
