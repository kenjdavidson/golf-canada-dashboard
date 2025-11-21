import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/primary-layout.tsx", [
    index("routes/home.tsx"),
    route("policy", "routes/policy.tsx"),
    route("privacy", "routes/privacy.tsx"),
    route("terms", "routes/terms.tsx")
  ])
] satisfies RouteConfig;
