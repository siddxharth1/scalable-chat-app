import { CHATS_URL } from "@/lib/ApiEndPoint";

export async function fetchChats(groupId: string, token: string) {
  try {
    const resp = await fetch(`${CHATS_URL}/${groupId}`, {
      headers: {
        Authorization: token,
      },
      cache: "no-cache",
    });
    if (!resp.ok) {
      throw new Error("failed to fetch data");
    }
    const data = await resp.json();
    if (data?.data) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.log("Erorr oro", error);
  }
}
