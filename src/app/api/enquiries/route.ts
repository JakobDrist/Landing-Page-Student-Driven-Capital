import membership from "@/content/data/membership.json";
import partnerships from "@/content/data/partnerships.json";

export async function POST(request: Request) {
  const fail = (status: number) =>
    Response.json({ error: "Kunne ikke gemme henvendelsen." }, { status });
  if (
    request.headers.get("origin") &&
    request.headers.get("origin") !== new URL(request.url).origin
  )
    return fail(403);
  try {
    const body = await request.text();
    if (body.length > 20000) return fail(413);
    const data = JSON.parse(body);
    if (
      !data ||
      !["membership", "partnership"].includes(data.kind) ||
      typeof data.id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        data.id,
      )
    )
      return fail(400);
    const definition =
      data.kind === "membership" ? membership.form : partnerships.form;
    const values: Record<string, string> = {};
    for (const field of definition.fields) {
      const value = data[field.name];
      if (
        typeof value !== "string" ||
        value.length > (field.type === "textarea" ? 5000 : 254) ||
        (field.required && !value.trim()) ||
        (field.type === "select" &&
          !field.options.some((option) => option.value === value))
      )
        return fail(400);
      values[field.name] = value.trim();
    }
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
      values.name.length > 200
    )
      return fail(400);
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return fail(503);
    const { name, email, ...details } = values;
    const response = await fetch(`${url}/rest/v1/website_enquiries`, {
      method: "POST",
      headers: {
        apikey: key,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        id: data.id,
        kind: data.kind,
        name,
        email: email.toLowerCase(),
        details,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      if (response.status !== 409 || error.code !== "23505") return fail(502);
    }
    return Response.json({ ok: true });
  } catch {
    return fail(400);
  }
}
