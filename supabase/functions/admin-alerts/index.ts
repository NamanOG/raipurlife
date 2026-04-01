import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type ReviewAlertPayload = {
  type: "review";
  payload: {
    place: string;
    category: string;
    authorName: string;
    rating: number;
    message: string;
  };
};

type ContactAlertPayload = {
  type: "contact";
  payload: {
    name: string;
    email: string;
    message: string;
  };
};

type AdminAlertPayload = ReviewAlertPayload | ContactAlertPayload;

type ChannelResult = {
  channel: "telegram" | "email";
  ok: boolean;
  error?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const clip = (value: string, max = 240) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}...`;
};

const buildMessage = (body: AdminAlertPayload) => {
  if (body.type === "review") {
    return [
      "📝 New review submitted",
      `Place: ${body.payload.place}`,
      `Category: ${body.payload.category}`,
      `Rating: ${body.payload.rating.toFixed(1)}/5`,
      `By: ${body.payload.authorName}`,
      `Message: ${clip(body.payload.message, 300)}`,
      "Action: Open moderation page",
    ].join("\n");
  }

  return [
    "📬 New contact message",
    `From: ${body.payload.name}`,
    `Email: ${body.payload.email}`,
    `Message: ${clip(body.payload.message, 300)}`,
    "Action: Open moderation page",
  ].join("\n");
};

const buildSubject = (body: AdminAlertPayload) => {
  if (body.type === "review") {
    return `New review: ${body.payload.place} (${body.payload.category})`;
  }

  return `New contact message from ${body.payload.name}`;
};

const sendTelegramAlert = async (botToken: string, chatId: string, text: string): Promise<ChannelResult> => {
  const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    const errorText = await telegramResponse.text();
    return {
      channel: "telegram",
      ok: false,
      error: errorText,
    };
  }

  return { channel: "telegram", ok: true };
};

const sendEmailAlert = async (
  resendApiKey: string,
  to: string,
  from: string,
  subject: string,
  text: string,
): Promise<ChannelResult> => {
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return {
      channel: "email",
      ok: false,
      error: errorText,
    };
  }

  return { channel: "email", ok: true };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const alertEmailTo = Deno.env.get("ALERT_EMAIL_TO");
  const alertEmailFrom = Deno.env.get("ALERT_EMAIL_FROM") || "Raipur.life Alerts <onboarding@resend.dev>";

  let body: AdminAlertPayload;

  try {
    body = (await req.json()) as AdminAlertPayload;
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!body?.type || !body?.payload) {
    return new Response(JSON.stringify({ error: "invalid_payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const text = buildMessage(body);
  const subject = buildSubject(body);

  const results: ChannelResult[] = [];

  if (botToken && chatId) {
    results.push(await sendTelegramAlert(botToken, chatId, text));
  }

  if (resendApiKey && alertEmailTo) {
    results.push(await sendEmailAlert(resendApiKey, alertEmailTo, alertEmailFrom, subject, text));
  }

  if (results.length === 0) {
    return new Response(JSON.stringify({ error: "missing_notification_config" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const delivered = results.filter((result) => result.ok);
  const failed = results.filter((result) => !result.ok);

  if (delivered.length === 0) {
    return new Response(JSON.stringify({ error: "notification_send_failed", failed }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true, delivered, failed }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
