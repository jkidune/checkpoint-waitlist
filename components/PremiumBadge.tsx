import { BadgeCheck } from "lucide-react";

export default function PremiumBadge() {
  return (
    <span className="premiumBadge" aria-hidden="true">
      <span className="premiumBadge__ring" />
      <span className="premiumBadge__glass">
        <BadgeCheck className="premiumBadge__icon" />
      </span>
    </span>
  );
}