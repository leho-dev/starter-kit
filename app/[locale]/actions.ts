"use server";

import { prisma } from "@/configs/prisma/db";
import { handleErrorServerNoAuth } from "@/utils/handleErrorServer";

const getAllNickname = async () =>
  handleErrorServerNoAuth({
    cb: async () => {
      const nicknames = await prisma.nickname.findMany({
        select: {
          content: true,
          updatedAt: true
        }
      });

      return nicknames;
    }
  });

export { getAllNickname };
