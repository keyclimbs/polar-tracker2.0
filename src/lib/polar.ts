import { z } from "zod";

export const authorizeUrl = "https://flow.polar.com/oauth2/authorization";
export const tokenUrl = "https://polarremote.com/v2/oauth2/token";
export const apiBase = "https://www.polaraccesslink.com/v3";

export const polarTokenSchema = z.object({
  access_token: z.string().min(1),
  expires_in: z.number().optional(),
  token_type: z.string().optional(),
  user_id: z.union([z.string(), z.number()]).optional(),
});

export const polarCallbackSchema = z.object({
  code: z.string().min(1),
  state: z.string().optional(),
});

export async function polarRequest(path: string, accessToken: string) {
  if (!path.startsWith("/")) throw new Error("Polar API path must be absolute");
  const response = await fetch(`${apiBase}${path}`, {
    headers: { Authorization: "Bearer " + accessToken, Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Polar API request failed (${response.status})`);
  return response.json();
}
