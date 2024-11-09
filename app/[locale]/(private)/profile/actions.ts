"use server";

import { handleErrorServerWithAuth } from "@/utils/handleErrorServer";
import { prisma } from "@/configs/prisma/db";
import { revalidateTag, unstable_cache } from "next/cache";

const getProfile = async () =>
  handleErrorServerWithAuth({
    cb: ({ user }) =>
      unstable_cache(
        async () => {
          const nickname = await prisma.nickname.findUnique({
            where: {
              authorId: user!.id
            }
          });

          console.info("[actions.ts:18] ", "refetch user profile", user!.email);

          return {
            ...user,
            nickname: nickname?.content
          };
        },
        ["profile", user!.id],
        { tags: [`profile::${user!.id}`] }
      )()
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

      revalidateTag("nicknames");
      revalidateTag(`profile::${user!.id}`);
      return updatedNickname;
    }
  });

export { getProfile, updateNickname };
