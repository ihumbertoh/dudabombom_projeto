import { Component, signal } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("Duda Bomboniere");
  protected readonly year = new Date().getFullYear();

  protected menuOpen = false;

  protected toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  protected closeMenu() {
    this.menuOpen = false;
  }
}
