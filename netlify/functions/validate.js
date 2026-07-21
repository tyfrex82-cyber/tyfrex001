// Tyfrex License Validation Function
// POST /.netlify/functions/validate
// Body: { key: "TYFREX-DPD-XXXXX-XXXXX", app: "dpd-desktop" }

const LICENSES = {
  "TYFREX-TRIAL-FA0DO-UEH30": {
    "operator": "Trial",
    "app": "both",
    "issued": "2026-07-17",
    "expiry": "2026-08-16",
    "active": true
  },
};

const APP_MAP = {
  "dpd-desktop":   ["dpd", "both"],
  "yodel-desktop": ["yodel", "both"],
  "dpd-mobile":    ["dpd", "both"],
  "yodel-mobile":  ["yodel", "both"],
};

exports.handler = async function(event) {
  const h = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers: h, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: h, body: JSON.stringify({ error: "Method not allowed" }) };

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch(e) { return { statusCode: 400, headers: h, body: JSON.stringify({ valid: false, reason: "Invalid JSON" }) }; }

  const { key, app } = body;
  if (!key || !app) return { statusCode: 400, headers: h, body: JSON.stringify({ valid: false, reason: "Missing key or app" }) };

  const k = (key || "").trim().toUpperCase();
  const lic = LICENSES[k];

  if (!lic) return { statusCode: 200, headers: h, body: JSON.stringify({ valid: false, reason: "License key not found" }) };
  if (!lic.active) return { statusCode: 200, headers: h, body: JSON.stringify({ valid: false, reason: "License deactivated. Contact hello@tyfrex.com" }) };

  const today = new Date().toISOString().split("T")[0];
  if (lic.expiry < today) return { statusCode: 200, headers: h, body: JSON.stringify({ valid: false, reason: "Expired " + lic.expiry + ". Contact hello@tyfrex.com" }) };
  if (!(APP_MAP[app] || []).includes(lic.app)) return { statusCode: 200, headers: h, body: JSON.stringify({ valid: false, reason: "Key not valid for " + app }) };

  return {
    statusCode: 200,
    headers: h,
    body: JSON.stringify({
      valid: true,
      operator: lic.operator,
      expiry: lic.expiry,
      app: lic.app,
      daysRemaining: Math.floor((new Date(lic.expiry) - new Date()) / 86400000)
    })
  };
};
