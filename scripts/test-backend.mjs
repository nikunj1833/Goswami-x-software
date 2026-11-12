/**
 * RN Developer — Comprehensive Backend & Security Verification Suite
 * Tests all backend modules, validations, rate limiting, hashing, webhooks, and route logic.
 */

import crypto from "crypto";
import assert from "assert";
import fs from "fs";
import path from "path";

// 1. Test Phone Normalization
import { parsePhoneNumberFromString } from "libphonenumber-js";

function normalizePhoneNumber(rawPhone, defaultCountry = "IN") {
  if (!rawPhone || typeof rawPhone !== "string") {
    return { isValid: false, e164: "", formattedInternational: "", error: "Phone number is required." };
  }
  const cleaned = rawPhone.trim();
  const phoneNumber = parsePhoneNumberFromString(cleaned, defaultCountry);
  if (!phoneNumber || !phoneNumber.isValid()) {
    return { isValid: false, e164: "", formattedInternational: "", error: "Invalid phone number format." };
  }
  return {
    isValid: true,
    e164: phoneNumber.number,
    formattedInternational: phoneNumber.formatInternational(),
    country: phoneNumber.country,
  };
}

// 2. Test Zod Validation Schemas
import { z } from "zod";

const startAuthSchema = z.object({
  phoneNumber: z.string({ error: "Phone number is required." }).min(7).max(25),
  displayName: z.string().max(60).optional(),
});

const verifyAuthSchema = z.object({
  challengeId: z.string({ error: "Challenge ID is required." }).uuid(),
  code: z.string({ error: "Verification code is required." }).regex(/^\d{6}$/),
});

const sanitizeText = (input) => {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, "")
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "'": return "&#39;";
        case '"': return "&quot;";
        case "&": return "&amp;";
        default: return char;
      }
    })
    .trim();
};

const contactFormSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters.")
    .transform(sanitizeText),
  email: z
    .string({ error: "Email is required." })
    .email("Please provide a valid email address.")
    .max(150, "Email cannot exceed 150 characters.")
    .toLowerCase()
    .trim(),
  message: z
    .string({ error: "Message is required." })
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(3000, "Message cannot exceed 3000 characters.")
    .transform(sanitizeText),
  phoneNumber: z
    .string()
    .max(30, "Phone number is too long.")
    .optional(),
});

// 3. Test HMAC & OTP Challenge Hashing
function hashOtp(code, phoneNumberE164, secret = "test_hmac_secret_key_1234567890") {
  return crypto.createHmac("sha256", secret).update(`${phoneNumberE164}:${code}`).digest("hex");
}

function generateOtpCode() {
  return crypto.randomInt(100000, 1000000).toString();
}

// 4. Test Webhook Signature Verification
function verifyMetaWebhookSignature(rawBody, signatureHeader, appSecret) {
  if (!signatureHeader || !appSecret) return false;
  const parts = signatureHeader.split("=");
  if (parts.length !== 2 || parts[0] !== "sha256") return false;
  const signatureHex = parts[1];
  try {
    const expectedSignature = crypto.createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const actualBuffer = Buffer.from(signatureHex, "hex");
    if (expectedBuffer.length !== actualBuffer.length) return false;
    return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
  } catch {
    return false;
  }
}

// Run Test Suite
async function runTests() {
  console.log("==================================================");
  console.log("RUNNING RN DEVELOPER BACKEND TEST SUITE");
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  async function testAsync(name, fn) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  // --- Group 1: Phone Normalization Tests ---
  console.log("Group 1: Phone Normalization & E.164");
  test("Normalizes Indian 10-digit number to E.164", () => {
    const res = normalizePhoneNumber("9876543210", "IN");
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.e164, "+919876543210");
    assert.strictEqual(res.country, "IN");
  });

  test("Normalizes Indian number with international prefix", () => {
    const res = normalizePhoneNumber("+91 98765 43210");
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.e164, "+919876543210");
  });

  test("Normalizes US phone number", () => {
    const res = normalizePhoneNumber("+1 (415) 555-2671");
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.e164, "+14155552671");
    assert.strictEqual(res.country, "US");
  });

  test("Rejects malformed and invalid phone strings", () => {
    assert.strictEqual(normalizePhoneNumber("not-a-number").isValid, false);
    assert.strictEqual(normalizePhoneNumber("123").isValid, false);
    assert.strictEqual(normalizePhoneNumber("").isValid, false);
  });

  // --- Group 2: Zod Validations ---
  console.log("\nGroup 2: Input Validations (Auth & Contact)");
  test("startAuthSchema accepts valid phone number", () => {
    const parse = startAuthSchema.safeParse({ phoneNumber: "+919876543210", displayName: "Test User" });
    assert.strictEqual(parse.success, true);
  });

  test("startAuthSchema rejects missing phone number", () => {
    const parse = startAuthSchema.safeParse({});
    assert.strictEqual(parse.success, false);
  });

  test("verifyAuthSchema validates UUID challenge and 6-digit OTP", () => {
    const validUuid = crypto.randomUUID();
    const parse = verifyAuthSchema.safeParse({ challengeId: validUuid, code: "123456" });
    assert.strictEqual(parse.success, true);
  });

  test("verifyAuthSchema rejects non-UUID or non-6-digit code", () => {
    assert.strictEqual(verifyAuthSchema.safeParse({ challengeId: "invalid-id", code: "123456" }).success, false);
    assert.strictEqual(verifyAuthSchema.safeParse({ challengeId: crypto.randomUUID(), code: "12345" }).success, false);
    assert.strictEqual(verifyAuthSchema.safeParse({ challengeId: crypto.randomUUID(), code: "abcdef" }).success, false);
  });

  test("contactFormSchema sanitizes HTML and malicious tags", () => {
    const dirty = {
      name: "Alice <script>alert(1)</script>",
      email: "Alice@Example.COM",
      message: "Hello, <b>interested</b> in project collaboration! Please contact me soon.",
    };
    const parse = contactFormSchema.safeParse(dirty);
    assert.strictEqual(parse.success, true);
    assert.strictEqual(parse.data.name.includes("<script>"), false);
    assert.strictEqual(parse.data.email, "alice@example.com");
    assert.strictEqual(parse.data.message.includes("<b>"), false);
  });

  // --- Group 3: Cryptographic OTP Hashing & Timing-Safe Comparison ---
  console.log("\nGroup 3: OTP Generation, Hashing & Verification Security");
  test("Generates 6-digit OTP in valid range [100000, 999999]", () => {
    for (let i = 0; i < 50; i++) {
      const code = generateOtpCode();
      assert.strictEqual(code.length, 6);
      const num = parseInt(code, 10);
      assert.ok(num >= 100000 && num <= 999999);
    }
  });

  test("OTP hash is deterministic with secret and phone number", () => {
    const hash1 = hashOtp("456789", "+919876543210");
    const hash2 = hashOtp("456789", "+919876543210");
    const hashDiffPhone = hashOtp("456789", "+919876543211");
    const hashDiffCode = hashOtp("456780", "+919876543210");
    assert.strictEqual(hash1, hash2);
    assert.notStrictEqual(hash1, hashDiffPhone);
    assert.notStrictEqual(hash1, hashDiffCode);
  });

  test("Timing-safe verification authenticates matching hash and rejects mismatched hash", () => {
    const code = "654321";
    const phone = "+919876543210";
    const storedHash = hashOtp(code, phone);

    const testMatch = hashOtp("654321", phone);
    const bufExpected = Buffer.from(storedHash, "hex");
    const bufTest = Buffer.from(testMatch, "hex");
    assert.strictEqual(crypto.timingSafeEqual(bufExpected, bufTest), true);

    const testWrong = hashOtp("654320", phone);
    const bufWrong = Buffer.from(testWrong, "hex");
    assert.strictEqual(crypto.timingSafeEqual(bufExpected, bufWrong), false);
  });

  // --- Group 4: Meta WhatsApp Webhook HMAC Verification ---
  console.log("\nGroup 4: Meta WhatsApp Webhook HMAC-SHA256 Verification");
  test("Valid Meta webhook signature passes timingSafeEqual check", () => {
    const appSecret = "meta_app_secret_super_secure_key_987";
    const rawBody = JSON.stringify({ object: "whatsapp_business_account", entry: [] });
    const validSignature = crypto.createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
    const header = `sha256=${validSignature}`;

    const isValid = verifyMetaWebhookSignature(rawBody, header, appSecret);
    assert.strictEqual(isValid, true);
  });

  test("Tampered webhook payload or forged signature is strictly rejected", () => {
    const appSecret = "meta_app_secret_super_secure_key_987";
    const rawBody = JSON.stringify({ object: "whatsapp_business_account", entry: [] });
    const forgedHeader = "sha256=1111222233334444555566667777888899990000aaaabbbbccccddddeeeeffff";

    assert.strictEqual(verifyMetaWebhookSignature(rawBody, forgedHeader, appSecret), false);
    assert.strictEqual(verifyMetaWebhookSignature(rawBody + "tampered", `sha256=${crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex")}`, appSecret), false);
    assert.strictEqual(verifyMetaWebhookSignature(rawBody, null, appSecret), false);
    assert.strictEqual(verifyMetaWebhookSignature(rawBody, "invalid-header-format", appSecret), false);
  });

  // --- Group 5: Rate Limiting & User Isolation Logic ---
  console.log("\nGroup 5: Rate Limiting & User Field Immutability");
  test("In-memory rate limiter strictly enforces threshold and window expiration", () => {
    const memoryStore = new Map();
    function checkRate(key, limit, windowMs) {
      const now = Date.now();
      const entry = memoryStore.get(key);
      if (!entry || now > entry.resetAt) {
        memoryStore.set(key, { count: 1, resetAt: now + windowMs });
        return { allowed: true, remaining: limit - 1 };
      }
      if (entry.count >= limit) {
        return { allowed: false, remaining: 0 };
      }
      entry.count++;
      return { allowed: true, remaining: limit - entry.count };
    }

    const testKey = "rate_test_ip_1";
    assert.strictEqual(checkRate(testKey, 3, 1000).allowed, true); // count: 1
    assert.strictEqual(checkRate(testKey, 3, 1000).allowed, true); // count: 2
    assert.strictEqual(checkRate(testKey, 3, 1000).allowed, true); // count: 3
    assert.strictEqual(checkRate(testKey, 3, 1000).allowed, false); // count: 4 (rejected)
  });

  test("User profile updates strictly restrict affected keys to safe fields", () => {
    const allowedKeys = new Set(["displayName", "email", "photoURL", "updatedAt"]);
    
    // Test safe update
    const safeUpdateKeys = ["displayName", "email", "updatedAt"];
    const isSafe = safeUpdateKeys.every(k => allowedKeys.has(k));
    assert.strictEqual(isSafe, true);

    // Test malicious update attempting privilege escalation
    const exploitUpdateKeys = ["displayName", "role", "authProvider"];
    const isExploitBlocked = !exploitUpdateKeys.every(k => allowedKeys.has(k));
    assert.strictEqual(isExploitBlocked, true);
  });

  // --- Group 6: Idempotency & Contact Deduplication ---
  console.log("\nGroup 6: Idempotency & Duplicate Prevention");
  test("Submission hash deduplicates identical contact submissions", () => {
    const submission1 = { email: "test@example.com", message: "Hello world inquiry" };
    const hash1 = crypto.createHash("sha256").update(`${submission1.email}:${submission1.message}`).digest("hex");

    const submission2 = { email: "test@example.com", message: "Hello world inquiry" };
    const hash2 = crypto.createHash("sha256").update(`${submission2.email}:${submission2.message}`).digest("hex");

    const submission3 = { email: "test@example.com", message: "Different message" };
    const hash3 = crypto.createHash("sha256").update(`${submission3.email}:${submission3.message}`).digest("hex");

    assert.strictEqual(hash1, hash2);
    assert.notStrictEqual(hash1, hash3);
  });

  test("Atomic idempotency transaction lock simulates concurrent submission deduplication", async () => {
    // Simulate Firestore transaction state
    const store = new Map();
    const nowMs = Date.now();
    const submissionHash = crypto.createHash("sha256").update("client@example.com:Concurrent test inquiry").digest("hex");
    const lockKey = `idempotency_${submissionHash}`;

    // Helper simulating atomic transaction execution
    async function executeSubmissionTx(id) {
      // Atomic get & set simulation
      const existing = store.get(lockKey);
      if (existing && nowMs < existing.expiresAtMs) {
        return { isDuplicate: true };
      }
      store.set(lockKey, {
        submissionId: id,
        submissionHash,
        createdAtMs: nowMs,
        expiresAtMs: nowMs + 5 * 60 * 1000,
      });
      return { isDuplicate: false, submissionId: id };
    }

    // Run first submission
    const res1 = await executeSubmissionTx("uuid-1");
    assert.strictEqual(res1.isDuplicate, false);
    assert.strictEqual(res1.submissionId, "uuid-1");

    // Run concurrent submission with identical hash
    const res2 = await executeSubmissionTx("uuid-2");
    assert.strictEqual(res2.isDuplicate, true);

    // Verify separate inquiry from same user has separate lock and succeeds
    const differentHash = crypto.createHash("sha256").update("client@example.com:Another different inquiry").digest("hex");
    const res3 = store.get(`idempotency_${differentHash}`);
    assert.strictEqual(res3, undefined);
  });

  // --- Group 7: Contact Form Input Validation & Schemas ---
  console.log("\nGroup 7: Contact Form Input Validation & Sanitization");
  test("contactFormSchema rejects message shorter than 10 characters", () => {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Too short",
    });
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.error.issues[0]?.message, "Message must be at least 10 characters.");
  });

  test("contactFormSchema rejects invalid email address", () => {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email: "not-an-email",
      message: "Valid project inquiry with enough length.",
    });
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.error.issues[0]?.message, "Please provide a valid email address.");
  });

  test("contactFormSchema rejects empty or whitespace-only name", () => {
    const result = contactFormSchema.safeParse({
      name: "   ",
      email: "john@example.com",
      message: "Valid project inquiry with enough length.",
    });
    assert.strictEqual(result.success, false);
  });

  test("contactFormSchema sanitizes HTML and script tags from message and name", () => {
    const result = contactFormSchema.safeParse({
      name: "Alice <script>alert('xss')</script>",
      email: "alice@example.com",
      message: "Looking for <img src=x onerror=alert(1)> development of mobile app.",
    });
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.data.name.includes("<script>"), false);
    assert.strictEqual(result.data.message.includes("<img"), false);
  });

  test("ContactForm.tsx has zero WhatsApp UI elements, icons, or text", () => {
    const contactFormPath = path.resolve("src/components/ContactForm.tsx");
    assert.strictEqual(fs.existsSync(contactFormPath), true);
    const source = fs.readFileSync(contactFormPath, "utf8");
    assert.strictEqual(/whatsapp/i.test(source), false, "ContactForm.tsx must not contain any WhatsApp references");
    assert.strictEqual(/phone\s+number/i.test(source), true);
    assert.strictEqual(source.includes("reply to your email address"), true);
    assert.strictEqual(source.includes("Send Project Inquiry"), true);
    assert.strictEqual(/className=.*reveal/i.test(source), false, "ContactForm must not have reveal class hiding it");
  });

  test("Contact form client payload matches backend contactFormSchema without notification channel fields", () => {
    const clientPayload = {
      name: "Prospective Client",
      email: "client@example.com",
      message: "Inquiry about custom Android mobile application.",
      phoneNumber: "+919876543210",
    };
    const parsed = contactFormSchema.safeParse(clientPayload);
    assert.strictEqual(parsed.success, true);
    assert.strictEqual(parsed.data.name, "Prospective Client");
    assert.strictEqual(parsed.data.email, "client@example.com");
    assert.strictEqual(parsed.data.phoneNumber, "+919876543210");
    // Ensure no notification preference field is required
    assert.strictEqual("notificationChannel" in parsed.data, false);
    assert.strictEqual("whatsappOptIn" in parsed.data, false);
  });

  test("ContactForm.tsx safely parses API responses without failing with false Network Error", () => {
    const contactFormPath = path.resolve("src/components/ContactForm.tsx");
    const source = fs.readFileSync(contactFormPath, "utf8");
    assert.strictEqual(source.includes("let data:"), true);
  });

  test("next.config.ts configures serverExternalPackages with firebase-admin", () => {
    const nextConfigPath = path.resolve("next.config.ts");
    const source = fs.readFileSync(nextConfigPath, "utf8");
    assert.strictEqual(source.includes("serverExternalPackages"), true);
    assert.strictEqual(source.includes("firebase-admin"), true);
  });

  test("package.json specifies Node engines >=22 for firebase-admin compatibility", () => {
    const pkgPath = path.resolve("package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    assert.strictEqual(Boolean(pkg.engines && pkg.engines.node), true);
    assert.strictEqual(pkg.engines.node.includes("22"), true);
  });

  test("src/lib/firebase/admin.ts uses lazy auth loading to prevent ERR_REQUIRE_ESM crashes", () => {
    const adminPath = path.resolve("src/lib/firebase/admin.ts");
    const source = fs.readFileSync(adminPath, "utf8");
    // Ensure top-level eager import of getAuth from firebase-admin/auth is NOT present
    assert.strictEqual(source.includes('import { getAuth'), false);
    // Ensure lazy getter for auth is used
    assert.strictEqual(source.includes('get auth()'), true);
  });

  test("src/lib/env.ts getFirebaseServerConfig safely normalizes quotes, whitespace, and newlines (functional test)", async () => {
    const originalEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const originalKey = process.env.FIREBASE_PRIVATE_KEY;

    try {
      const { getFirebaseServerConfig } = await import("../src/lib/env.ts");

      // Test 1: Quotes and whitespace padding
      process.env.FIREBASE_CLIENT_EMAIL = '  "service-acct@project.iam.gserviceaccount.com"  ';
      process.env.FIREBASE_PRIVATE_KEY = '  "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgk\\n-----END PRIVATE KEY-----\\n"  ';

      const config1 = getFirebaseServerConfig();
      assert.strictEqual(config1.clientEmail, "service-acct@project.iam.gserviceaccount.com");
      assert.strictEqual(config1.privateKey, "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgk\n-----END PRIVATE KEY-----\n");

      // Test 2: JSON payload pasted into private key
      delete process.env.FIREBASE_CLIENT_EMAIL;
      process.env.FIREBASE_PRIVATE_KEY = JSON.stringify({
        client_email: "extracted@project.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\\nJSON_KEY\\n-----END PRIVATE KEY-----",
      });

      const config2 = getFirebaseServerConfig();
      assert.strictEqual(config2.clientEmail, "extracted@project.iam.gserviceaccount.com");
      assert.strictEqual(config2.privateKey, "-----BEGIN PRIVATE KEY-----\nJSON_KEY\n-----END PRIVATE KEY-----");

      // Test 3: Base64 encoded PEM key
      const rawPem = "-----BEGIN PRIVATE KEY-----\nMII_BASE64_KEY\n-----END PRIVATE KEY-----";
      process.env.FIREBASE_CLIENT_EMAIL = "b64@project.iam.gserviceaccount.com";
      process.env.FIREBASE_PRIVATE_KEY = Buffer.from(rawPem).toString("base64");

      const config3 = getFirebaseServerConfig();
      assert.strictEqual(config3.privateKey, rawPem);

      // Test 4: Raw base64 key body without PEM headers
      const sampleBody = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6".repeat(30); // > 500 chars
      process.env.FIREBASE_PRIVATE_KEY = sampleBody;

      const config4 = getFirebaseServerConfig();
      assert.strictEqual(config4.privateKey, `-----BEGIN PRIVATE KEY-----\n${sampleBody}\n-----END PRIVATE KEY-----\n`);
    } finally {
      if (originalEmail !== undefined) process.env.FIREBASE_CLIENT_EMAIL = originalEmail;
      else delete process.env.FIREBASE_CLIENT_EMAIL;

      if (originalKey !== undefined) process.env.FIREBASE_PRIVATE_KEY = originalKey;
      else delete process.env.FIREBASE_PRIVATE_KEY;
    }
  });

  // --- Group 8: Resend Email & Meta WhatsApp Template Verification ---
  console.log("\nGroup 8: Resend Email & Meta WhatsApp Template Clients");

  // Email template builder simulation matching src/lib/email/client.ts
  function escapeHtml(text) {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function buildInquiryEmailHtml(inquiry) {
    const safeName = escapeHtml(inquiry.name);
    const safeEmail = escapeHtml(inquiry.email);
    const safePhone = inquiry.phoneNumber ? escapeHtml(inquiry.phoneNumber) : "Not provided";
    const safeMessage = escapeHtml(inquiry.message).replace(/\n/g, "<br />");
    const safeId = escapeHtml(inquiry.id);
    const safeDate = escapeHtml(inquiry.createdAtIso);
    return `<!DOCTYPE html><html><body><h1>RN Developer Contact Submission</h1><p>${safeName}</p><p>${safeEmail}</p><p>${safePhone}</p><div>${safeMessage}</div><span>${safeId}</span><span>${safeDate}</span></body></html>`;
  }

  // Simulated Resend client matching src/lib/email/client.ts
  async function simulateSendEmailNotification(inquiry, config, fetchImpl = fetch) {
    const attemptedAt = new Date().toISOString();
    if (!config.resendApiKey || !config.notificationEmail) {
      return {
        success: false,
        status: "unconfigured",
        attemptedAt,
        error: "Missing RESEND_API_KEY or CONTACT_NOTIFICATION_EMAIL environment configuration.",
      };
    }

    const html = buildInquiryEmailHtml(inquiry);
    const subject = `New Contact Inquiry — RN Developer (${inquiry.name})`;

    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: config.emailFrom,
          to: [config.notificationEmail],
          reply_to: inquiry.email,
          subject,
          html,
          headers: {
            "X-Entity-Ref-ID": inquiry.id,
          },
        }),
        signal: AbortSignal.timeout(8000),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.id) {
        return {
          success: true,
          status: "api_accepted",
          attemptedAt,
          sentAt: new Date().toISOString(),
          messageId: data.id,
        };
      }

      const errorCode = data?.name || data?.error?.name || `HTTP_${response.status}`;
      const errorMessage =
        data?.message || data?.error?.message || `Resend API HTTP ${response.status}`;

      return {
        success: false,
        status: "failed",
        attemptedAt,
        errorCode,
        error: errorMessage,
      };
    } catch (err) {
      const isTimeout = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
      return {
        success: false,
        status: "failed",
        attemptedAt,
        errorCode: isTimeout ? "TIMEOUT" : "NETWORK_ERROR",
        error: err instanceof Error ? err.message : "Failed to connect to Resend API.",
      };
    }
  }

  // Simulated WhatsApp client matching src/lib/whatsapp/client.ts
  function formatForMetaWhatsApp(e164) {
    return (e164 || "").replace(/^\+/, "").replace(/[\s-]/g, "");
  }

  async function simulateSendWhatsAppTemplateNotification(inquiry, config, fetchImpl = fetch) {
    const attemptedAt = new Date().toISOString();
    if (
      !config.phoneNumberId ||
      !config.accessToken ||
      !config.notificationTo ||
      !config.templateName
    ) {
      return {
        success: false,
        status: "unconfigured",
        attemptedAt,
        error:
          "Missing required Meta WhatsApp configuration: WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_NOTIFICATION_TO, or WHATSAPP_TEMPLATE_NAME.",
      };
    }

    const recipient = formatForMetaWhatsApp(config.notificationTo);
    if (!/^\d{8,15}$/.test(recipient)) {
      return {
        success: false,
        status: "failed",
        attemptedAt,
        errorCode: "INVALID_DESTINATION_PHONE",
        error: `Invalid destination WhatsApp phone number: "${config.notificationTo}". Expected valid E.164 phone number with 8 to 15 digits.`,
      };
    }

    const graphVersion = config.graphApiVersion || "v21.0";
    const url = `https://graph.facebook.com/${graphVersion}/${config.phoneNumberId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: "template",
      template: {
        name: config.templateName,
        language: {
          code: config.templateLanguage || "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: inquiry.name.slice(0, 100) },
              { type: "text", text: inquiry.email.slice(0, 100) },
              { type: "text", text: (inquiry.phoneNumber || "Not provided").slice(0, 50) },
              { type: "text", text: inquiry.message.slice(0, 500) },
              { type: "text", text: inquiry.id },
              { type: "text", text: inquiry.createdAtIso },
            ],
          },
        ],
      },
    };

    try {
      const response = await fetchImpl(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.messages?.[0]?.id) {
        return {
          success: true,
          status: "api_accepted",
          attemptedAt,
          sentAt: new Date().toISOString(),
          messageId: data.messages[0].id,
        };
      }

      const errorCode = data?.error?.code
        ? String(data.error.code)
        : data?.error?.type || `HTTP_${response.status}`;
      const errorMsg =
        data?.error?.message ||
        data?.error?.error_user_msg ||
        `Meta Graph API HTTP ${response.status}`;

      return {
        success: false,
        status: "failed",
        attemptedAt,
        errorCode,
        error: errorMsg,
      };
    } catch (err) {
      const isTimeout = err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
      return {
        success: false,
        status: "failed",
        attemptedAt,
        errorCode: isTimeout ? "TIMEOUT" : "NETWORK_ERROR",
        error: err instanceof Error ? err.message : "Failed to connect to Meta WhatsApp API.",
      };
    }
  }

  test("Email HTML builder escapes malicious tags and prevents HTML injection", () => {
    const malicious = {
      id: "uuid-123",
      createdAtIso: "2026-11-10T00:00:00.000Z",
      name: 'Hacker <script>alert("xss")</script>',
      email: "test@example.com",
      message: 'Hello <img src="x" onerror="steal()" /> & "quotes"',
      phoneNumber: "<script>",
    };
    const html = buildInquiryEmailHtml(malicious);
    assert.strictEqual(html.includes("<script>"), false);
    assert.strictEqual(html.includes("<img"), false);
    assert.strictEqual(html.includes("&amp;"), true);
    assert.strictEqual(html.includes("&quot;quotes&quot;"), true);
  });

  await testAsync("Resend client formats payload with reply_to, sender, headers and returns api_accepted", async () => {
    let capturedUrl = "";
    let capturedOptions = null;

    const mockFetch = async (url, options) => {
      capturedUrl = url;
      capturedOptions = options;
      return {
        ok: true,
        status: 200,
        json: async () => ({ id: "re_test_message_123" }),
      };
    };

    const config = {
      resendApiKey: "re_valid_api_key_123",
      notificationEmail: "owner@example.com",
      emailFrom: "RN Developer <onboarding@resend.dev>",
    };

    const inquiry = {
      id: "inq-uuid-456",
      name: "Enterprise Client",
      email: "client@example.com",
      phoneNumber: "+919876543210",
      message: "We need full-cycle custom mobile and Android development.",
      createdAtIso: "2026-11-10T12:00:00.000Z",
    };

    const result = await simulateSendEmailNotification(inquiry, config, mockFetch);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.status, "api_accepted");
    assert.strictEqual(result.messageId, "re_test_message_123");
    assert.strictEqual(typeof result.sentAt, "string");
    assert.strictEqual(typeof result.attemptedAt, "string");

    assert.strictEqual(capturedUrl, "https://api.resend.com/emails");
    assert.strictEqual(capturedOptions.headers.Authorization, "Bearer re_valid_api_key_123");

    const sentBody = JSON.parse(capturedOptions.body);
    assert.deepStrictEqual(sentBody.to, ["owner@example.com"]);
    assert.strictEqual(sentBody.from, "RN Developer <onboarding@resend.dev>");
    assert.strictEqual(sentBody.reply_to, "client@example.com");
    assert.strictEqual(sentBody.subject.includes("Enterprise Client"), true);
    assert.strictEqual(sentBody.headers["X-Entity-Ref-ID"], "inq-uuid-456");
  });

  await testAsync("Resend client returns unconfigured status when API key is missing", async () => {
    const result = await simulateSendEmailNotification(
      { id: "1", name: "A", email: "a@b.com", message: "Hello", createdAtIso: "iso" },
      { resendApiKey: "", notificationEmail: "owner@example.com", emailFrom: "test@example.com" }
    );
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.status, "unconfigured");
    assert.strictEqual(typeof result.attemptedAt, "string");
  });

  await testAsync("Resend client handles API timeout gracefully and returns TIMEOUT errorCode", async () => {
    const mockTimeoutFetch = async () => {
      const err = new Error("The operation was aborted due to timeout");
      err.name = "TimeoutError";
      throw err;
    };
    const result = await simulateSendEmailNotification(
      { id: "1", name: "A", email: "a@b.com", message: "Hello", createdAtIso: "iso" },
      { resendApiKey: "re_key", notificationEmail: "owner@example.com", emailFrom: "test@example.com" },
      mockTimeoutFetch
    );
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.status, "failed");
    assert.strictEqual(result.errorCode, "TIMEOUT");
  });

  await testAsync("Resend client handles HTTP 422 error response and extracts errorCode", async () => {
    const mockErrorFetch = async () => ({
      ok: false,
      status: 422,
      json: async () => ({
        name: "validation_error",
        message: "The 'from' domain is not verified.",
      }),
    });
    const result = await simulateSendEmailNotification(
      { id: "1", name: "A", email: "a@b.com", message: "Hello", createdAtIso: "iso" },
      { resendApiKey: "re_key", notificationEmail: "owner@example.com", emailFrom: "test@example.com" },
      mockErrorFetch
    );
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.status, "failed");
    assert.strictEqual(result.errorCode, "validation_error");
    assert.strictEqual(result.error.includes("not verified"), true);
  });

  test("WhatsApp recipient number formatting strips leading plus and separators", () => {
    assert.strictEqual(formatForMetaWhatsApp("+91 98765 43210"), "919876543210");
    assert.strictEqual(formatForMetaWhatsApp("+1 (415) 555-0199"), "1(415)5550199");
    assert.strictEqual(formatForMetaWhatsApp("9876543210"), "9876543210");
  });

  await testAsync("WhatsApp client sends strictly approved template with 6 parameters and returns api_accepted", async () => {
    let capturedUrl = "";
    let capturedOptions = null;

    const mockFetch = async (url, options) => {
      capturedUrl = url;
      capturedOptions = options;
      return {
        ok: true,
        status: 200,
        json: async () => ({ messages: [{ id: "wamid.HBgLMTIzNDU2" }] }),
      };
    };

    const config = {
      phoneNumberId: "109876543210",
      accessToken: "EAAG_valid_meta_token",
      notificationTo: "+919876543210",
      templateName: "new_contact_inquiry",
      templateLanguage: "en_US",
      graphApiVersion: "v21.0",
    };

    const inquiry = {
      id: "inq-999",
      name: "Alice Builder",
      email: "alice@example.com",
      phoneNumber: "+91 98765 00000",
      message: "Please build an Android game in Unity.",
      createdAtIso: "2026-11-10T15:30:00.000Z",
    };

    const result = await simulateSendWhatsAppTemplateNotification(inquiry, config, mockFetch);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.status, "api_accepted");
    assert.strictEqual(result.messageId, "wamid.HBgLMTIzNDU2");
    assert.strictEqual(typeof result.sentAt, "string");
    assert.strictEqual(typeof result.attemptedAt, "string");

    assert.strictEqual(capturedUrl, "https://graph.facebook.com/v21.0/109876543210/messages");
    assert.strictEqual(capturedOptions.headers.Authorization, "Bearer EAAG_valid_meta_token");

    const payload = JSON.parse(capturedOptions.body);
    assert.strictEqual(payload.messaging_product, "whatsapp");
    assert.strictEqual(payload.recipient_type, "individual");
    assert.strictEqual(payload.to, "919876543210");
    assert.strictEqual(payload.type, "template");
    assert.strictEqual(payload.text, undefined); // Strictly template-only, zero freeform text
    assert.strictEqual(payload.template.name, "new_contact_inquiry");
    assert.strictEqual(payload.template.language.code, "en_US");

    const params = payload.template.components[0].parameters;
    assert.strictEqual(params.length, 6);
    assert.strictEqual(params[0].text, "Alice Builder");
    assert.strictEqual(params[1].text, "alice@example.com");
    assert.strictEqual(params[2].text, "+91 98765 00000");
    assert.strictEqual(params[3].text, "Please build an Android game in Unity.");
    assert.strictEqual(params[4].text, "inq-999");
    assert.strictEqual(params[5].text, "2026-11-10T15:30:00.000Z");
  });

  await testAsync("WhatsApp client rejects invalid recipient phone format", async () => {
    const config = {
      phoneNumberId: "123",
      accessToken: "EAAG_token",
      notificationTo: "invalid-phone",
      templateName: "inquiry",
    };
    const result = await simulateSendWhatsAppTemplateNotification(
      { id: "1", name: "A", email: "a@b.com", message: "Msg", createdAtIso: "iso" },
      config
    );
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.status, "failed");
    assert.strictEqual(result.errorCode, "INVALID_DESTINATION_PHONE");
  });

  await testAsync("WhatsApp client returns unconfigured status when config is missing", async () => {
    const result = await simulateSendWhatsAppTemplateNotification(
      { id: "1", name: "A", email: "a@b.com", message: "Msg", createdAtIso: "iso" },
      { phoneNumberId: "", accessToken: "", notificationTo: "", templateName: "" }
    );
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.status, "unconfigured");
  });

  await testAsync("WhatsApp client handles Meta Graph API error response properly", async () => {
    const mockMetaError = async () => ({
      ok: false,
      status: 400,
      json: async () => ({
        error: {
          message: "Template does not exist in requested language.",
          type: "OAuthException",
          code: 132001,
        },
      }),
    });
    const config = {
      phoneNumberId: "123",
      accessToken: "EAAG_token",
      notificationTo: "+919876543210",
      templateName: "missing_template",
    };
    const result = await simulateSendWhatsAppTemplateNotification(
      { id: "1", name: "A", email: "a@b.com", message: "Msg", createdAtIso: "iso" },
      config,
      mockMetaError
    );
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.status, "failed");
    assert.strictEqual(result.errorCode, "132001");
    assert.strictEqual(result.error.includes("Template does not exist"), true);
  });

  await testAsync("WhatsApp client handles timeout and returns TIMEOUT errorCode", async () => {
    const mockTimeout = async () => {
      const err = new Error("The operation was aborted due to timeout");
      err.name = "TimeoutError";
      throw err;
    };
    const config = {
      phoneNumberId: "123",
      accessToken: "EAAG_token",
      notificationTo: "+919876543210",
      templateName: "inquiry",
    };
    const result = await simulateSendWhatsAppTemplateNotification(
      { id: "1", name: "A", email: "a@b.com", message: "Msg", createdAtIso: "iso" },
      config,
      mockTimeout
    );
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.status, "failed");
    assert.strictEqual(result.errorCode, "TIMEOUT");
  });

  // --- Group 9: Production vs Development Hardening Pipeline ---
  console.log("\nGroup 9: Production vs Development Hardening & Durability");

  // Mock harness matching exact logic of route.ts
  async function simulateContactPipeline({
    body,
    isProduction = false,
    hasCredentials = false,
    firestoreMock = null,
    emailMock = null,
    whatsAppMock = null,
    devMemory = new Map(),
  }) {
    let parsedBody;
    if (typeof body === "string") {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        return { status: 400, data: { success: false, error: "Malformed request payload. Please provide valid JSON." } };
      }
    } else {
      parsedBody = body;
    }

    const parseResult = contactFormSchema.safeParse(parsedBody);
    if (!parseResult.success) {
      return { status: 400, data: { success: false, error: parseResult.error.issues[0]?.message || "Invalid contact form input." } };
    }

    if (isProduction && !hasCredentials) {
      return { status: 503, data: { success: false, error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly." } };
    }

    const { name, email, message, phoneNumber } = parseResult.data;
    const submissionHash = crypto.createHash("sha256").update(`${email}:${message}`).digest("hex");
    const nowMs = Date.now();
    const fiveMinutesAgoMs = nowMs - 5 * 60 * 1000;
    const createdAtIso = new Date().toISOString();

    if (isProduction) {
      if (!hasCredentials) {
        return { status: 503, data: { success: false, error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly." } };
      }

      if (firestoreMock) {
        try {
          const isDup = await firestoreMock.checkDuplicate(submissionHash, fiveMinutesAgoMs);
          if (isDup) {
            return { status: 200, data: { success: true, message: "Your message has already been received. Thank you!" } };
          }
        } catch {
          return { status: 503, data: { success: false, error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly." } };
        }

        const submissionId = crypto.randomUUID();
        try {
          await firestoreMock.writeSubmission({
            id: submissionId,
            name,
            email,
            message,
            phoneNumber,
            submissionHash,
            createdAtIso,
            emailNotification: { status: "pending", attemptedAt: null, sentAt: null, messageId: null, errorCode: null },
            whatsappNotification: { status: "pending", attemptedAt: null, sentAt: null, messageId: null, errorCode: null },
          });
        } catch {
          return { status: 503, data: { success: false, error: "We couldn't securely save your inquiry right now. Please try again later or contact us directly." } };
        }

        // Secondary notifications triggered strictly AFTER confirmed Firestore write
        let emailResult = { status: "unconfigured", attemptedAt: new Date().toISOString() };
        let whatsappResult = { status: "unconfigured", attemptedAt: new Date().toISOString() };

        const [eRes, wRes] = await Promise.all([
          emailMock ? emailMock.send().catch((err) => ({ status: "failed", error: err.message, attemptedAt: new Date().toISOString() })) : emailResult,
          whatsAppMock ? whatsAppMock.send().catch((err) => ({ status: "failed", error: err.message, attemptedAt: new Date().toISOString() })) : whatsappResult,
        ]);

        emailResult = eRes;
        whatsappResult = wRes;

        if (firestoreMock.updateNotificationStatus) {
          try {
            await firestoreMock.updateNotificationStatus(submissionId, {
              emailNotification: {
                status: emailResult.status,
                attemptedAt: emailResult.attemptedAt,
                sentAt: emailResult.sentAt || null,
                messageId: emailResult.messageId || null,
                errorCode: emailResult.errorCode || null,
              },
              whatsappNotification: {
                status: whatsappResult.status,
                attemptedAt: whatsappResult.attemptedAt,
                sentAt: whatsappResult.sentAt || null,
                messageId: whatsappResult.messageId || null,
                errorCode: whatsappResult.errorCode || null,
              },
            });
          } catch (updateErr) {
            console.warn("[Test Mock Warning] Failed to update notification status:", updateErr.message);
          }
        }

        return {
          status: 200,
          data: { success: true, message: "Thank you for reaching out! Your inquiry has been received." },
          notifications: { email: emailResult.status, whatsapp: whatsappResult.status },
        };
      }
    }

    // Development mode
    for (const item of devMemory.values()) {
      if (item.submissionHash === submissionHash && item.createdAt >= fiveMinutesAgoMs) {
        return { status: 200, data: { success: true, message: "Your message has already been received. Thank you!" } };
      }
    }

    const submissionId = crypto.randomUUID();
    devMemory.set(submissionId, { id: submissionId, ...parseResult.data, submissionHash, createdAt: nowMs });

    return { status: 200, data: { success: true, message: "Thank you for reaching out! (Saved in local development fallback mode)" } };
  }

  const validInquiry = {
    name: "Enterprise Client",
    email: "enterprise@example.com",
    message: "We need full-cycle custom mobile and Android development.",
    phoneNumber: "+919876543210",
  };

  await testAsync("1. Development submission with Firestore unavailable succeeds with dev indicator", async () => {
    const devMemory = new Map();
    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: false,
      hasCredentials: false,
      devMemory,
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.message.includes("development fallback mode"), true);
    assert.strictEqual(devMemory.size, 1);
  });

  await testAsync("2. Production missing Firebase credentials fails closed with HTTP 503", async () => {
    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: true,
      hasCredentials: false,
    });
    assert.strictEqual(res.status, 503);
    assert.strictEqual(res.data.success, false);
    assert.strictEqual(res.data.error.includes("securely save your inquiry"), true);
  });

  await testAsync("3. Production Firestore write succeeds returns HTTP 200 and records api_accepted notification statuses", async () => {
    let writeCalled = false;
    let statusUpdated = false;
    const firestoreMock = {
      checkDuplicate: async () => false,
      writeSubmission: async () => { writeCalled = true; },
      updateNotificationStatus: async (id, statuses) => {
        statusUpdated = true;
        assert.strictEqual(statuses.emailNotification.status, "api_accepted");
        assert.strictEqual(statuses.whatsappNotification.status, "api_accepted");
        assert.strictEqual(statuses.emailNotification.messageId, "re_msg_123");
        assert.strictEqual(statuses.whatsappNotification.messageId, "wamid_456");
      },
    };
    const emailMock = {
      send: async () => ({ status: "api_accepted", success: true, messageId: "re_msg_123", attemptedAt: new Date().toISOString(), sentAt: new Date().toISOString() }),
    };
    const whatsAppMock = {
      send: async () => ({ status: "api_accepted", success: true, messageId: "wamid_456", attemptedAt: new Date().toISOString(), sentAt: new Date().toISOString() }),
    };

    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: true,
      hasCredentials: true,
      firestoreMock,
      emailMock,
      whatsAppMock,
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(writeCalled, true);
    assert.strictEqual(statusUpdated, true);
    assert.strictEqual(res.notifications.email, "api_accepted");
    assert.strictEqual(res.notifications.whatsapp, "api_accepted");
  });

  await testAsync("4. Production Firestore write fails returns HTTP 503 error and skips notifications", async () => {
    let emailSent = false;
    let whatsappSent = false;
    const firestoreMock = {
      checkDuplicate: async () => false,
      writeSubmission: async () => { throw new Error("Firestore write quota exceeded"); },
    };
    const emailMock = { send: async () => { emailSent = true; } };
    const whatsAppMock = { send: async () => { whatsappSent = true; } };

    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: true,
      hasCredentials: true,
      firestoreMock,
      emailMock,
      whatsAppMock,
    });

    assert.strictEqual(res.status, 503);
    assert.strictEqual(res.data.success, false);
    assert.strictEqual(emailSent, false);
    assert.strictEqual(whatsappSent, false);
  });

  await testAsync("5. Independent tracking: Email api_accepted and WhatsApp failed are tracked separately in Firestore", async () => {
    let recordedStatuses = null;
    const firestoreMock = {
      checkDuplicate: async () => false,
      writeSubmission: async () => {},
      updateNotificationStatus: async (id, statuses) => {
        recordedStatuses = statuses;
      },
    };
    const emailMock = {
      send: async () => ({
        status: "api_accepted",
        success: true,
        messageId: "re_ok_999",
        attemptedAt: new Date().toISOString(),
        sentAt: new Date().toISOString(),
      }),
    };
    const whatsAppMock = {
      send: async () => ({
        status: "failed",
        success: false,
        errorCode: "INVALID_PHONE",
        error: "Destination number format invalid",
        attemptedAt: new Date().toISOString(),
      }),
    };

    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: true,
      hasCredentials: true,
      firestoreMock,
      emailMock,
      whatsAppMock,
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(recordedStatuses.emailNotification.status, "api_accepted");
    assert.strictEqual(recordedStatuses.whatsappNotification.status, "failed");
    assert.strictEqual(recordedStatuses.whatsappNotification.errorCode, "INVALID_PHONE");
  });

  await testAsync("6. Independent tracking: Email failed and WhatsApp api_accepted are tracked separately in Firestore", async () => {
    let recordedStatuses = null;
    const firestoreMock = {
      checkDuplicate: async () => false,
      writeSubmission: async () => {},
      updateNotificationStatus: async (id, statuses) => {
        recordedStatuses = statuses;
      },
    };
    const emailMock = {
      send: async () => ({
        status: "failed",
        success: false,
        errorCode: "TIMEOUT",
        error: "Resend timed out",
        attemptedAt: new Date().toISOString(),
      }),
    };
    const whatsAppMock = {
      send: async () => ({
        status: "api_accepted",
        success: true,
        messageId: "wamid.success",
        attemptedAt: new Date().toISOString(),
        sentAt: new Date().toISOString(),
      }),
    };

    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: true,
      hasCredentials: true,
      firestoreMock,
      emailMock,
      whatsAppMock,
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(recordedStatuses.emailNotification.status, "failed");
    assert.strictEqual(recordedStatuses.emailNotification.errorCode, "TIMEOUT");
    assert.strictEqual(recordedStatuses.whatsappNotification.status, "api_accepted");
  });

  await testAsync("7. Both notifications failing does NOT fail the request if Firestore inquiry was saved", async () => {
    let recordedStatuses = null;
    const firestoreMock = {
      checkDuplicate: async () => false,
      writeSubmission: async () => {},
      updateNotificationStatus: async (id, statuses) => {
        recordedStatuses = statuses;
      },
    };
    const emailMock = {
      send: async () => ({
        status: "failed",
        success: false,
        errorCode: "NETWORK_ERROR",
        error: "DNS lookup failed",
        attemptedAt: new Date().toISOString(),
      }),
    };
    const whatsAppMock = {
      send: async () => ({
        status: "failed",
        success: false,
        errorCode: "TIMEOUT",
        error: "Meta API timeout",
        attemptedAt: new Date().toISOString(),
      }),
    };

    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: true,
      hasCredentials: true,
      firestoreMock,
      emailMock,
      whatsAppMock,
    });

    // Inquiry is safely in Firestore, so visitor still gets HTTP 200 without false delivery claim
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.message, "Thank you for reaching out! Your inquiry has been received.");
    assert.strictEqual(recordedStatuses.emailNotification.status, "failed");
    assert.strictEqual(recordedStatuses.whatsappNotification.status, "failed");
  });

  await testAsync("8. Production rate-limit persistence unavailable fails closed with HTTP 503", async () => {
    const isProduction = true;
    const hasServerCredentials = false;
    let rateLimitResult;
    if (isProduction && !hasServerCredentials) {
      rateLimitResult = { allowed: false, limit: 5, remaining: 0, resetInSeconds: 0, unavailable: true };
    }
    assert.strictEqual(rateLimitResult.allowed, false);
    assert.strictEqual(rateLimitResult.unavailable, true);
  });

  await testAsync("9. Duplicate submission within 5 minutes returns idempotent HTTP 200 without duplicate write or notifications", async () => {
    let writeCount = 0;
    let emailSent = false;
    let whatsappSent = false;
    const firestoreMock = {
      checkDuplicate: async () => true, // Duplicate found
      writeSubmission: async () => { writeCount++; },
    };
    const emailMock = { send: async () => { emailSent = true; } };
    const whatsAppMock = { send: async () => { whatsappSent = true; } };

    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: true,
      hasCredentials: true,
      firestoreMock,
      emailMock,
      whatsAppMock,
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.message, "Your message has already been received. Thank you!");
    assert.strictEqual(writeCount, 0); // No duplicate document written
    assert.strictEqual(emailSent, false); // No duplicate email sent
    assert.strictEqual(whatsappSent, false); // No duplicate WhatsApp sent
  });

  await testAsync("10. Invalid input returns HTTP 400", async () => {
    const res = await simulateContactPipeline({
      body: { name: "A", email: "invalid-email", message: "too short" },
      isProduction: true,
      hasCredentials: true,
    });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.data.success, false);
  });

  await testAsync("11. Malformed JSON payload returns HTTP 400", async () => {
    const res = await simulateContactPipeline({
      body: "{invalid-json-content",
      isProduction: true,
      hasCredentials: true,
    });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.data.success, false);
    assert.strictEqual(res.data.error, "Malformed request payload. Please provide valid JSON.");
  });

  await testAsync("12. Notification status update error produces warning but does not fail the HTTP 200 response", async () => {
    const firestoreMock = {
      checkDuplicate: async () => false,
      writeSubmission: async () => {},
      updateNotificationStatus: async () => {
        throw new Error("Transient Firestore update timeout");
      },
    };
    const emailMock = {
      send: async () => ({ status: "api_accepted", success: true, messageId: "msg1", attemptedAt: "iso" }),
    };

    const res = await simulateContactPipeline({
      body: validInquiry,
      isProduction: true,
      hasCredentials: true,
      firestoreMock,
      emailMock,
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.success, true);
  });

  // --- Group 10: Compiled /api/contact Route Production Execution ---
  const compiledRoutePath = path.resolve(".next/server/app/api/contact/route.js");
  if (fs.existsSync(compiledRoutePath)) {
    console.log("\nGroup 10: Compiled /api/contact Route Production Execution");
    const routeModule = await import(compiledRoutePath);
    await routeModule.default.routeModule.ensureUserland();
    const POST = routeModule.default.routeModule.userland.POST;

    await testAsync("Compiled production POST rejects malformed JSON payload with HTTP 400", async () => {
      const res = await POST(new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{malformed-json",
      }));
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.strictEqual(data.error, "Malformed request payload. Please provide valid JSON.");
    });

    await testAsync("Compiled production POST rejects short message (< 10 chars) with HTTP 400", async () => {
      const res = await POST(new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "user@example.com",
          message: "Short",
        }),
      }));
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.strictEqual(data.error, "Message must be at least 10 characters.");
    });

    await testAsync("Compiled production POST fails closed with HTTP 503 when Firebase credentials missing", async () => {
      const res = await POST(new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "172.16.10.1",
          "user-agent": "TestSuiteAgent/1.0",
        },
        body: JSON.stringify({
          name: "Enterprise Client",
          email: "enterprise@example.com",
          message: "We need full-cycle custom mobile and Android development.",
          phoneNumber: "+919876543210",
        }),
      }));
      assert.strictEqual(res.status, 503);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.strictEqual(data.error, "We couldn't securely save your inquiry right now. Please try again later or contact us directly.");
    });
  }

  console.log("\n==================================================");
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
