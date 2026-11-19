import { randomUUID } from "node:crypto";
import { readdirSync, readFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import Database from "better-sqlite3";
import type { PrismaClient } from "@/generated/prisma/client";
import { createDbClient } from "./db";

const MIGRATIONS_DIR = join(process.cwd(), "prisma", "migrations");

export type TestDb = Readonly<{
  db: PrismaClient;
  path: string;
  cleanup: () => Promise<void>;
}>;

/**
 * Creates a throwaway SQLite file under os.tmpdir() with every migration in
 * prisma/migrations applied (folder names are timestamp-prefixed, so sorted
 * order is apply order). Never touches DATABASE_URL or data/.
 */
export function createTestDb(): TestDb {
  const path = join(tmpdir(), `shinn-test-${randomUUID()}.db`);

  const sqlite = new Database(path);
  try {
    const migrationDirs = readdirSync(MIGRATIONS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    for (const dir of migrationDirs) {
      sqlite.exec(
        readFileSync(join(MIGRATIONS_DIR, dir, "migration.sql"), "utf8"),
      );
    }
  } finally {
    sqlite.close();
  }

  const db = createDbClient(`file:${path}`);
  return {
    db,
    path,
    cleanup: async () => {
      await db.$disconnect();
      unlinkSync(path);
    },
  };
}
