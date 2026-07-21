import { Icon, type IconSymbol } from "@sanity/icons";

/**
 * The installed @sanity/icons build only exports the generic `Icon`
 * component + an `icons` symbol map — not the per-icon named exports
 * (`HomeIcon`, `CogIcon`, etc.) that its type declarations advertise.
 * This wraps `Icon` so schema `icon:` fields can still use a plain
 * component, e.g. `icon: makeIcon("home")`.
 */
export function makeIcon(symbol: IconSymbol) {
  return function SchemaIcon() {
    return <Icon symbol={symbol} />;
  };
}
