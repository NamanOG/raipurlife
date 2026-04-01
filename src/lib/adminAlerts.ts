import { isSupabaseConfigured, supabase } from "@/lib/supabase";

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

export const sendAdminAlert = async (data: AdminAlertPayload) => {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { error } = await supabase.functions.invoke("admin-alerts", {
    body: data,
  });

  if (error) {
    return false;
  }

  return true;
};
