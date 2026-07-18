import { createFileRoute } from "@tanstack/react-router";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "@/lib/pdf/resume-pdf";
import type { ResumeData } from "@/lib/mock-data";
import React from "react";

type Body = { data: ResumeData; template: string; accent: string; filename?: string };

const POST = async ({ request }: { request: Request }) => {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!body?.data?.personal?.fullName) {
    return new Response(JSON.stringify({ error: "Missing resume data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = React.createElement(ResumeDocument as any, {
      data: body.data,
      template: body.template || "modern",
      accent: body.accent || "#E76F51",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buffer = await renderToBuffer(element as any);

    const safeName = (body.filename || body.data.personal.fullName || "resume")
      .replace(/[^a-z0-9-_]+/gi, "_")
      .slice(0, 60);

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeName}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("PDF render failed:", err);
    return new Response(
      JSON.stringify({ error: "Failed to render PDF", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const routeOptions = {
  server: {
    handlers: { POST },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const Route = createFileRoute("/api/resume-pdf")(routeOptions);
