/**
 * End-to-End Live HTTP Test for Goswami X Software API Endpoints
 */

import assert from "assert";

const BASE_URL = "http://localhost:3001";

async function run() {
  console.log("==================================================");
  console.log("TESTING LIVE HTTP API ROUTES ON", BASE_URL);
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
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

  // 1. Logout endpoint
  await test("POST /api/auth/logout returns 200 and success: true", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, { method: "POST" });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });

  // 2. Auth me protected endpoint without token
  await test("GET /api/auth/me without token returns 401 Unauthorized", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`);
    assert.strictEqual(res.status, 401);
    const data = await res.json();
    assert.strictEqual(data.authenticated, false);
  });

  // 3. Users me protected GET endpoint without token
  await test("GET /api/users/me without token returns 401 Unauthorized", async () => {
    const res = await fetch(`${BASE_URL}/api/users/me`);
    assert.strictEqual(res.status, 401);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  // 4. Users me protected PATCH endpoint without token
  await test("PATCH /api/users/me without token returns 401 Unauthorized", async () => {
    const res = await fetch(`${BASE_URL}/api/users/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName: "Hacker" }),
    });
    assert.strictEqual(res.status, 401);
  });

  // 5. WhatsApp Auth Start input validation
  await test("POST /api/auth/whatsapp/start with empty body returns 400", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/whatsapp/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  await test("POST /api/auth/whatsapp/start with invalid phone returns 400", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/whatsapp/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: "1234" }),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  // 6. WhatsApp Auth Verify input validation
  await test("POST /api/auth/whatsapp/verify with invalid challengeId returns 400", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/whatsapp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeId: "not-a-uuid", code: "123456" }),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  await test("POST /api/auth/whatsapp/verify with invalid 4-digit code returns 400", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/whatsapp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        challengeId: "123e4567-e89b-12d3-a456-426614174000",
        code: "1234",
      }),
    });
    assert.strictEqual(res.status, 400);
  });

  // 7. Contact form validation
  await test("POST /api/contact with invalid email returns 400", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "not-an-email",
        message: "This is a test project inquiry message.",
      }),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  await test("POST /api/contact with short message (<10 chars) returns 400", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "Hi",
      }),
    });
    assert.strictEqual(res.status, 400);
  });

  // 8. WhatsApp Webhook GET challenge verification
  await test("GET /api/whatsapp/webhook with mismatched token returns 403 Forbidden", async () => {
    const res = await fetch(
      `${BASE_URL}/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=wrong_token&hub.challenge=test_challenge_abc`
    );
    assert.strictEqual(res.status, 403);
  });

  // 9. WhatsApp Webhook POST malformed payload
  await test("POST /api/whatsapp/webhook with malformed JSON returns 400", async () => {
    const res = await fetch(`${BASE_URL}/api/whatsapp/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json{",
    });
    assert.strictEqual(res.status, 400);
  });

  console.log("\n==================================================");
  console.log(`LIVE ROUTE TESTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

// Allow server 1.5 seconds to warm up
setTimeout(run, 1500);
