import { createClient } from "@supabase/supabase-js";

type RsvpRequest = {
  name?: unknown;
  attendance?: unknown;
};

export async function POST(request: Request) {
  let body: RsvpRequest;

  try {
    body = (await request.json()) as RsvpRequest;
  } catch {
    return Response.json({ error: "Please submit a valid RSVP." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const attendance = body.attendance;

  if (name.length < 2 || name.length > 120) {
    return Response.json({ error: "Please enter a name between 2 and 120 characters." }, { status: 400 });
  }

  if (attendance !== "accept" && attendance !== "decline") {
    return Response.json({ error: "Please choose whether you can attend." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: "RSVPs are not configured yet. Please try again later." }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error } = await supabase.from("wedding_rsvps").insert({
    full_name: name,
    attendance,
  });

  if (error) {
    console.error("Unable to save wedding RSVP:", error.message);
    return Response.json({ error: "We could not save your reply. Please try again later." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
