export interface DecodedClaims {
  accountId: string;
  plan: string;
  role: string;
  permissions: string[];
}

export function decodeJwt(token: string): DecodedClaims | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload) as Record<string, unknown>;
    const permissionsRaw = (payload.permissions as string) ?? '';

    return {
      accountId: (payload.account_id as string) ?? '',
      plan: (payload.plan as string) ?? 'Desconocido',
      role: ((payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? payload.role) as string) ?? '',
      permissions: permissionsRaw ? permissionsRaw.split(' ') : [],
    };
  } catch {
    return null;
  }
}
