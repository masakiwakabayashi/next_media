
## ⚡ Frontend

```
docker compose up -d
```

```
pnpm dev
```

### Testing

```
pnpm test
```

```
pnpm exec playwright test
```

### Supabase

```
supabase db diff -f create
```

```
supabase db dump --local --data-only -f dump.sql
```

#### Supabaseの型定義を更新

```
pnpm gen:types
```







