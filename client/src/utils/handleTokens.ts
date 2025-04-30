class Tokens {
  getAccessToken() {
    return localStorage.getItem("access-token");
  }

  getRefreshToken() {
    return localStorage.getItem("refresh-token");
  }

  setTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string | null | undefined;
    refreshToken: string | null | undefined;
  }) {
    if (accessToken) localStorage.setItem("access-token", accessToken);
    if (refreshToken) localStorage.setItem("refresh-token", refreshToken);
  }

  clearTokens() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  }
}

const tokens = new Tokens();

export { tokens };
