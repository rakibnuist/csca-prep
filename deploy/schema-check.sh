#!/usr/bin/env bash
# Compare the production database schema with prisma/schema.prisma.
set -uo pipefail

Q() { docker exec csca-db psql -U csca -d cscamaster -tAc "$1" 2>&1 | sed 's/^/  /'; }

echo "=== tables ==="
Q "select tablename from pg_tables where schemaname='public' order by 1"

echo
echo "=== User columns ==="
Q "select column_name||' '||data_type||' '||coalesce(column_default,'-') from information_schema.columns where table_name='User' order by ordinal_position"

echo
echo "=== Lead columns ==="
Q "select column_name from information_schema.columns where table_name='Lead' order by ordinal_position"

echo
echo "=== enum-ish values in use ==="
Q "select 'User.status: '||coalesce(string_agg(distinct status,','),'none') from \"User\""
Q "select 'User.plan: '||coalesce(string_agg(distinct plan,','),'none') from \"User\""
Q "select 'Lead.status: '||coalesce(string_agg(distinct status,','),'none') from \"Lead\""
Q "select 'VerificationCode.purpose: '||coalesce(string_agg(distinct purpose,','),'none') from \"VerificationCode\""

echo
echo "=== row counts ==="
Q "select 'User: '||count(*) from \"User\""
Q "select 'Attempt: '||count(*) from \"Attempt\""
Q "select 'ReviewItem: '||count(*) from \"ReviewItem\""
Q "select 'Lead: '||count(*) from \"Lead\""
Q "select 'Coupon: '||count(*) from \"Coupon\""
Q "select 'PlanTask: '||count(*) from \"PlanTask\""
Q "select 'ConceptProgress: '||count(*) from \"ConceptProgress\""
Q "select 'VerificationCode: '||count(*) from \"VerificationCode\""

echo
echo "=== indexes on User ==="
Q "select indexname||' -> '||indexdef from pg_indexes where tablename='User' order by 1"
