export type InsufficientCreditsMessageInput = {
  required_credits: number;
  balance: number;
  items_count?: number;
  credits_per_item?: number;
};

export function buildInsufficientCreditsMessage(input: InsufficientCreditsMessageInput): string {
  const { required_credits, balance, items_count, credits_per_item } = input;
  const req = required_credits.toLocaleString();
  const bal = balance.toLocaleString();

  if (items_count !== undefined && credits_per_item !== undefined && items_count > 0) {
    const per = credits_per_item.toLocaleString();
    const noun = items_count === 1 ? "generation" : "generations";
    return `You need ${req} credits to start ${items_count} ${noun} (${per} credits each). Your balance is ${bal}.`;
  }

  return `You need ${req} credits. Your balance is ${bal}.`;
}
