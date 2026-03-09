"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseClient } from "@/lib/supabase";

export async function addPie(formData: FormData) {
  const supabase = createSupabaseClient();

  const data = {
    name: (formData.get("name") as string)?.trim(),
    pie_name: (formData.get("pie_name") as string)?.trim(),
    pie_type: formData.get("pie_type") as string,
    serves: formData.get("serves") as string,
    notes: ((formData.get("notes") as string) || "").trim() || null,
  };

  if (!data.name || !data.pie_name || !data.pie_type || !data.serves) {
    throw new Error("Please fill in all required fields.");
  }

  const { error } = await supabase.from("pie_commitments").insert(data);
  if (error) throw new Error(error.message);

  revalidatePath("/");
}
