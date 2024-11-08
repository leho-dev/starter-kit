import en from "@/configs/messages/en.json";

type Messages = typeof en;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

export type locale = "en" | "vi";
