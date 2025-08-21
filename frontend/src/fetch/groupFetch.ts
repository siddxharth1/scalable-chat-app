import { CHAT_GROUP_URL, CHAT_GROUP_USER_URL } from "@/lib/ApiEndPoint";

export async function fetchChatGroups(token: string) {
  try {
    const resp = await fetch(CHAT_GROUP_URL, {
      headers: {
        Authorization: token,
      },

      next: {
        revalidate: 60 * 60,
        tags: ["dashboard"],
      },
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

export async function fetchChatGroup(id: string, token:string) {
  try {
    const resp = await fetch(`${CHAT_GROUP_URL}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    if (!resp.ok) {
      throw new Error("failed to fetch data");
    }
    const data = await resp.json();
    if (data?.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.log("Erorr fetchChatGroup", error);
  }
}

export async function fetchChatUsers(id: string) {
  try {
    const resp = await fetch(`${CHAT_GROUP_USER_URL}?group_id=${id}`, {
      cache: "no-cache",
    });
    if (!resp.ok) {
      throw new Error("failed to fetch data");
    }
    const data = await resp.json();
    if (data?.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.log("Erorr fetchChatUsers", error);
  }
}
