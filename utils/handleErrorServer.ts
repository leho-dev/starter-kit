import { ErrorResponse, SuccessResponse } from "./response";
import { type ResponseType } from "@/types/response";
import { type User } from "@supabase/supabase-js";
import { createClientSSR } from "@/configs/supabase/server";

type handleErrorServerType = {
  // eslint-disable-next-line no-unused-vars
  cb: ({ user }: { user?: User }) => Promise<object>;
};

const handleErrorServerNoAuth = async ({ cb }: handleErrorServerType): Promise<ResponseType> => {
  try {
    const res = await cb({});
    return SuccessResponse({ payload: res });
  } catch (error) {
    console.error("[handleErrorServer.ts:14] ", error);
    if (error instanceof Error) {
      return ErrorResponse({ message: error.message });
    }
    return ErrorResponse({ message: "Unknown error occurred!" });
  }
};

const handleErrorServerWithAuth = async ({ cb }: handleErrorServerType): Promise<ResponseType> => {
  try {
    const supabase = await createClientSSR();
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError) {
      return ErrorResponse({ message: authError.message });
    }

    if (!data.user) {
      return ErrorResponse({ message: "Unauthorized" });
    }

    const res = await cb({ user: data.user });
    return SuccessResponse({ payload: res });
  } catch (error) {
    console.error("[handleErrorServer.ts:33] ", error);
    if (error instanceof Error) {
      return ErrorResponse({ message: error.message });
    }
    return ErrorResponse({ message: "Unknown error occurred!" });
  }
};

export { handleErrorServerNoAuth, handleErrorServerWithAuth };
