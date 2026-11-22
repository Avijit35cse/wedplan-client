"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateUserStatus } from "./user-actions";

type UserStatusButtonProps = {
  userId: string;
  isBlocked: boolean;
};

export default function UserStatusButton({
  userId,
  isBlocked,
}: UserStatusButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [blocked, setBlocked] = useState(isBlocked);

  const handleToggle = () => {
    const action = blocked ? "unblock" : "block";

    startTransition(async () => {
      const result = await updateUserStatus(userId, action);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setBlocked(!blocked);
      toast.success(result.message);
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
        blocked
          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
      }`}
    >
      {isPending ? "Updating..." : blocked ? "Unblock" : "Block"}
    </button>
  );
}