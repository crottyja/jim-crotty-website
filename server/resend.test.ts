import "dotenv/config";
import { describe, it, expect } from "vitest";
import { Resend } from "resend";

describe("Resend API key validation", () => {
  it("RESEND_API_KEY env var is set", () => {
    expect(process.env.RESEND_API_KEY).toBeTruthy();
    expect(process.env.RESEND_API_KEY!.startsWith("re_")).toBe(true);
  });

  it("Resend client can be initialized and list domains (validates key format)", async () => {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    // Listing domains is a lightweight read-only call that validates the key
    const { data, error } = await resend.domains.list();
    expect(error).toBeNull();
    expect(data).toBeDefined();
  });
});
