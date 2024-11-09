"use server";

import { prisma } from "@/configs/prisma/db";
import { handleErrorServerNoAuth } from "@/utils/handleErrorServer";
import { unstable_cache } from "next/cache";

const getAllNickname = async () =>
  handleErrorServerNoAuth({
    cb: unstable_cache(
      async () => {
        const nicknames = await prisma.nickname.findMany({
          select: {
            content: true,
            updatedAt: true
          }
        });

        console.info("[actions.ts:16] ", "refetch all nicknames");

        return nicknames;
      },
      ["nicknames"],
      { tags: ["nicknames"] }
    )
  });

export { getAllNickname };
