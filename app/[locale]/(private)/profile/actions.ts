"use server";

import { handleErrorServerWithAuth } from "@/utils/handleErrorServer";
import { prisma } from "@/configs/prisma/db";
import { revalidatePath } from "next/cache";

const getProfile = async () =>
  handleErrorServerWithAuth({
    cb: async ({ user }) => {
      const nickname = await prisma.nickname.findUnique({
        where: {
          authorId: user!.id
        }
      });

      return {
        ...user,
        nickname: nickname?.content
      };
    }
  });

const updateNickname = async (nickname: string) =>
  handleErrorServerWithAuth({
    cb: async ({ user }) => {
      const existingNickname = await prisma.nickname.findFirst({
        where: { content: nickname }
      });

      if (existingNickname) {
        throw new Error("Nickname already exists!");
      }

      const updatedNickname = await prisma.nickname.upsert({
        where: {
          authorId: user!.id
        },
        update: {
          content: nickname
        },
        create: {
          content: nickname,
          authorId: user!.id
        }
      });

      revalidatePath("/[locale]", "page");
      return updatedNickname;
    }
  });

export { getProfile, updateNickname };
