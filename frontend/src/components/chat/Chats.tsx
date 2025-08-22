"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { ChatGroupType, GroupChatUserType, MessageType } from "../../../types";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/options";

type EnhancedMessage = MessageType & { _optimistic?: boolean };

export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: ChatGroupType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) {
  const { data: session } = useSession();
  const sessionUserName = (session?.user as any)?.name || "Unknown";
  const sessionUserId = Number((session?.user as any)?.id);
  console.log("sessionUserId", sessionUserId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<EnhancedMessage>>(oldMessages);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>();

  // Connect socket once
  useEffect(() => {
    const s = getSocket();
    s.auth = { room: group.id };
    socketRef.current = s.connect();

    s.on("message", (data: MessageType) => {
      setMessages((prev) => {
        // If we have an optimistic message with same id, replace it
        const idx = prev.findIndex((m) => m.id === data.id);
        if (idx !== -1) {
          const clone = [...prev];
          clone[idx] = { ...data };
          return clone;
        }
        return [...prev, data];
      });
      scrollToBottom();
    });

    return () => {
      s.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group.id]);

  const scrollToBottom = useCallback(() => {
    // Slight timeout to ensure DOM updated
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim() || !socketRef.current) return;
    const id = uuidv4();
    const payload: EnhancedMessage = {
      id,
      message: message.trim(),
      name: sessionUserName,
      created_at: new Date().toISOString(),
      group_id: group.id,
      user_id: isNaN(sessionUserId) ? undefined : sessionUserId,
      _optimistic: true,
    };
    setIsSending(true);
    setMessages((prev) => [...prev, payload]);
    setMessage("");
    socketRef.current.emit("message", payload, () => {
      setIsSending(false);
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-3rem)] bg-gradient-to-b from-white to-slate-50 border-l">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-xs text-slate-400">
              No messages yet — start the conversation.
            </p>
          </div>
        )}
        {messages
          .sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          )
          .map((m, idx, arr) => {
            console.log("msg", m);
            const isSelf = m.name === session?.user?.name;
            const time = new Date(m.created_at);
            const prev = arr[idx - 1];
            const showDateSeparator =
              !prev ||
              new Date(prev.created_at).toDateString() !== time.toDateString();
            return (
              <React.Fragment key={m.id}>
                {showDateSeparator && (
                  <div className="sticky top-2 z-10 flex justify-center">
                    <span className="text-[10px] font-medium tracking-wide bg-white/80 backdrop-blur px-3 py-1 rounded-full border text-slate-500">
                      {time.toDateString()}
                    </span>
                  </div>
                )}
                <div
                  className={`group flex flex-col max-w-[78%] ${
                    isSelf ? "ml-auto items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-[11px] uppercase tracking-wide font-medium ${
                        isSelf ? "text-blue-600" : "text-slate-500"
                      }`}
                    >
                      {m.name || "Unknown"}
                    </span>
                    <span className="text-[10px] text-slate-400 transition-opacity">
                      {time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div
                    className={`relative rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm break-words ${
                      isSelf
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-slate-200 text-slate-900 rounded-bl-sm"
                    } ${m._optimistic ? "opacity-70" : "opacity-100"}`}
                  >
                    {m.message}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t bg-white/80 backdrop-blur px-3 py-2 flex items-end gap-2"
      >
        <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder={`Message #${group.title}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent focus:outline-none text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || isSending}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow hover:bg-blue-500 transition-colors"
        >
          <PaperPlaneIcon />
        </button>
      </form>
    </div>
  );
}
