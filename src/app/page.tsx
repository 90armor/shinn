import Link from "next/link";
import { buttonClassName } from "@/components/Button";
import { Card } from "@/components/Card";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Card className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold">Shinn</h1>
          <p className="mt-2 text-muted">
            Split group expenses and see who owes whom.
          </p>
        </div>
        <Link href="/groups/new" className={buttonClassName({ size: "lg" })}>
          Create a group
        </Link>
      </Card>
    </main>
  );
}
