import type { StructureResolver } from "sanity/structure";
import { makeIcon } from "./schemaTypes/icon";
import { SINGLETON_TYPES } from "./schemaTypes";

/** One fixed-id document per singleton type — this is what makes it a singleton. */
function singleton(
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  icon: React.ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title));
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Dyro Media Content")
    .items([
      singleton(S, "siteSettings", "Site Settings", makeIcon("cog")),
      S.divider(),
      singleton(S, "homePage", "Home Page", makeIcon("home")),
      singleton(S, "editingPage", "Editing Page", makeIcon("edit")),
      singleton(S, "productionPage", "Production Page", makeIcon("presentation")),
      singleton(S, "aboutPage", "About Page", makeIcon("users")),
      singleton(S, "servicesPage", "Services Page", makeIcon("stack-compact")),
      S.divider(),
      S.documentTypeListItem("portfolioItem").title("Portfolio Items"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.includes(item.getId() as (typeof SINGLETON_TYPES)[number])
          && !["portfolioItem", "service", "testimonial"].includes(item.getId() as string),
      ),
    ]);
