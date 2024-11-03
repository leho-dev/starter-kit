"use server";

import { revalidatePath } from "next/cache";

const revalidatePathAllLayout = async () => {
  revalidatePath("/", "layout");
};

export { revalidatePathAllLayout };
