import { Component, inject, HostListener } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-placeholder",
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section
      class="container mx-auto py-20"
      style="max-width:1280px; padding:80px 40px;"
    >
      <div *ngIf="title === 'Cardápio'" class="w-full">
        <div class="text-2xl font-bold" style="margin-bottom:24px">
          Produtos em destaque<br />
        </div>

        <div class="mt-2 text-left w-full">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
              *ngFor="let img of productImages; let i = index"
              class="rounded-lg overflow-hidden bg-white shadow"
            >
              <button
                (click)="openLightbox(i)"
                class="w-full h-auto p-0 m-0 block focus:outline-none flex items-center justify-center bg-white"
              >
                <div
                  class="w-full aspect-square overflow-hidden rounded"
                  style="aspect-ratio:1/1;"
                >
                  <img
                    [src]="img"
                    class="w-full h-full object-cover transform transition duration-300 ease-in-out hover:scale-105"
                    loading="lazy"
                    [attr.alt]="'Produto'"
                  />
                </div>
              </button>
            </div>
          </div>

          <!-- Lightbox overlay -->
          <div
            *ngIf="lightboxOpen"
            (click)="closeLightbox()"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          >
            <div
              (click)="$event.stopPropagation()"
              class="relative max-w-4xl w-full"
            >
              <button
                (click)="closeLightbox()"
                class="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow"
              >
                ✕
              </button>

              <div class="flex items-center">
                <button
                  (click)="prevImage()"
                  class="text-white text-3xl px-4"
                  aria-label="Anterior"
                >
                  ‹
                </button>
                <img
                  [src]="currentImage"
                  class="max-h-[80vh] mx-auto rounded-lg shadow-lg object-contain bg-white transform transition duration-300 ease-out scale-105 cursor-zoom-out"
                  [attr.alt]="'Visualização'"
                />
                <button
                  (click)="nextImage()"
                  class="text-white text-3xl px-4"
                  aria-label="Próximo"
                >
                  ›
                </button>
              </div>

              <div
                class="mt-4 flex gap-2 overflow-x-auto py-2 bg-white/5 rounded"
              >
                <button
                  *ngFor="let img of productImages; let j = index"
                  (click)="openLightbox(j)"
                  class="p-1"
                  [class.opacity-60]="currentIndex !== j"
                >
                  <img
                    [src]="img"
                    class="h-16 w-24 object-cover rounded transition-opacity duration-200"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);
  protected title = this.route.snapshot.data["title"] ?? "Em breve";

  // Product images provided by the user to showcase on the Cardápio page
  protected productImages: string[] = [
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Fbb1af608c16e4da39d0aed5d3668d6c5?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Ff25c6f675aa6440e956b9d38752aa474?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F823cb262bd6f4aa985dc9afa5e22187c?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F0edf528dabb04dfda3785a8dda0a4085?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Ff5ac44890c5c480ea08846f8c9249f09?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F9ef5fd64f5ae49ee97eafd443ed09326?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Fac7f227d651e40cab3341d96986338fd?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F9da5c700ea8d4964b475d8fa77ed3bd2?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F37f26ea4a1f14c39868192901a451467?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Fcfbb4a7de4a74621a10a6f911aff7b7b?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F792046002aa84c9cbcda2b1c7a23ecf8?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Facc38a12f7a24964bda18c426709eb88?format=webp&width=800",
  ];

  protected lightboxOpen = false;
  protected currentIndex = 0;
  protected currentImage = this.productImages[0];

  protected openLightbox(i: number) {
    this.currentIndex = i;
    this.currentImage = this.productImages[i];
    this.lightboxOpen = true;
  }

  protected closeLightbox() {
    this.lightboxOpen = false;
  }

  protected nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.productImages.length;
    this.currentImage = this.productImages[this.currentIndex];
  }

  protected prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.productImages.length) %
      this.productImages.length;
    this.currentImage = this.productImages[this.currentIndex];
  }

  @HostListener("window:keydown", ["$event"])
  protected handleKey(e: KeyboardEvent) {
    if (!this.lightboxOpen) return;
    if (e.key === "Escape") this.closeLightbox();
    if (e.key === "ArrowRight") this.nextImage();
    if (e.key === "ArrowLeft") this.prevImage();
  }
}
