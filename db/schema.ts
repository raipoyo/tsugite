import { sql } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  vector,
} from 'drizzle-orm/pg-core'

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  displayName: text('display_name').notNull().default(''),
  avatarUrl: text('avatar_url'),
  organizationIds: uuid('organization_ids')
    .array()
    .notNull()
    .default(sql`'{}'::uuid[]`),
  role: text('role'),
  shopProfile: jsonb('shop_profile'),
  successorProfile: jsonb('successor_profile'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const shops = pgTable(
  'shops',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    ownerProfileId: uuid('owner_profile_id')
      .notNull()
      .references(() => profiles.id, { onDelete: 'cascade' }),
    name: text('name').notNull().default(''),
    profile: jsonb('profile').$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('shops_owner_profile_id_key').on(table.ownerProfileId)],
)

export const interviews = pgTable(
  'interviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    shopId: uuid('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    storagePath: text('storage_path').notNull(),
    transcript: text('transcript'),
    durationSec: integer('duration_sec'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('interviews_shop_id_idx').on(table.shopId)],
)

export const tacitTags = pgTable(
  'tacit_tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    shopId: uuid('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    interviewId: uuid('interview_id').references(() => interviews.id, { onDelete: 'set null' }),
    situation: text('situation').notNull(),
    judgment: text('judgment').notNull(),
    reason: text('reason').notNull(),
    isInferred: boolean('is_inferred').notNull().default(false),
    meta: jsonb('meta').$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('tacit_tags_shop_id_idx').on(table.shopId),
    index('tacit_tags_interview_id_idx').on(table.interviewId),
  ],
)

export const tagEmbeddings = pgTable('tag_embeddings', {
  tagId: uuid('tag_id')
    .primaryKey()
    .references(() => tacitTags.id, { onDelete: 'cascade' }),
  embedding: vector('embedding', { dimensions: 1536 }).notNull(),
})

export const referenceScenes = pgTable(
  'reference_scenes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    shopId: uuid('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    sourceTagId: uuid('source_tag_id').references(() => tacitTags.id, { onDelete: 'set null' }),
    sceneName: text('scene_name').notNull(),
    correctState: jsonb('correct_state').$type<Record<string, unknown>>().notNull(),
    season: text('season'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('reference_scenes_shop_id_idx').on(table.shopId),
    index('reference_scenes_source_tag_id_idx').on(table.sourceTagId),
  ],
)

export const observationLogs = pgTable(
  'observation_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    shopId: uuid('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    sceneId: uuid('scene_id').references(() => referenceScenes.id, { onDelete: 'set null' }),
    observedAt: timestamp('observed_at', { withTimezone: true }).notNull().defaultNow(),
    visionResult: jsonb('vision_result').$type<Record<string, unknown>>().notNull().default({}),
    llmFeedback: text('llm_feedback'),
  },
  (table) => [
    index('observation_logs_shop_id_idx').on(table.shopId),
    index('observation_logs_scene_id_idx').on(table.sceneId),
  ],
)
