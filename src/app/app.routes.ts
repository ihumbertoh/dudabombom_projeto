import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home";
import { PlaceholderComponent } from "./pages/placeholder";
import { ContactComponent } from "./pages/contact";
import { SobreComponent } from "./pages/sobre";

export const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  {
    path: "cardapio",
    component: PlaceholderComponent,
    data: { title: "Cardápio" },
  },
  { path: "contato", component: ContactComponent, data: { title: "Contato" } },
  { path: "sobre", component: SobreComponent, data: { title: "Sobre" } },
  { path: "**", redirectTo: "" },
];
