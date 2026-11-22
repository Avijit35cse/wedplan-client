import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const toneByStatus = {
  pending: "gold",
  active: "sage",
  accepted: "sage",
  rejected: "rose",
  cancelled: "muted",
} as const;

type StatusTone = (typeof toneByStatus)[keyof typeof toneByStatus];

export default function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const tone: StatusTone =
    toneByStatus[status as keyof typeof toneByStatus] ?? "muted";

  return (
    <Badge tone={tone} className={cn("capitalize", className)}>
      {status}
    </Badge>
  );
}
