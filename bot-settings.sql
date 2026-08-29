-- =====================================================
-- 企微机器人配置表（每个账号一条配置，可指定推送范围）
-- 执行位置：Supabase Dashboard → SQL Editor → 粘贴运行
-- =====================================================

create table if not exists public.bot_settings (
  id bigint generated always as identity primary key,
  area text not null unique,        -- 配置所有者账号（如 000 / 001 / 666）
  enabled boolean not null default false,
  webhook_url text not null default '',
  push_time text not null default '22:00',
  target_areas jsonb not null default '[]', -- 实际推送到的区域列表，['all'] 表示全部区域
  push_content jsonb not null default '{"unchecked":true,"allChecked":true,"hourWarning":false,"dailyBrief":false}',
  last_push_at timestamptz,
  last_push_status text default '',
  last_push_summary text default '',
  updated_at timestamptz not null default now()
);

-- 旧表兼容：给没有 target_areas 的旧数据补默认值 [area]
alter table public.bot_settings add column if not exists target_areas jsonb not null default '[]';
update public.bot_settings set target_areas = to_jsonb(array[area]) where target_areas = '[]' or target_areas is null;

alter table public.bot_settings enable row level security;

drop policy if exists "bot_settings_all" on public.bot_settings;
create policy "bot_settings_all" on public.bot_settings for all using (true) with check (true);

-- 初始化：太原 000 用现有群机器人，每天 22:00 推本区域
insert into public.bot_settings (area, enabled, webhook_url, push_time, target_areas, push_content)
values (
  '000', true,
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=154a1039-ecbc-49ed-86bf-2261f530b14c',
  '22:00',
  '["000"]',
  '{"unchecked":true,"allChecked":true,"hourWarning":false,"dailyBrief":false}'
)
on conflict (area) do nothing;
