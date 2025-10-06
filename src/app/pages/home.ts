import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section [class]="'relative overflow-hidden ' + currentPaletteClass">
      <div
        class="container relative z-10 mx-auto grid gap-10 py-20 lg:grid-cols-2 lg:items-center px-6 sm:px-12 lg:px-20 bg-[rgba(232,223,202,1)]"
      >
        <div>
          <span class="chip mb-4">Doces • Gelados • Conveniência</span>
          <h1
            class="text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl"
          >
            Duda Bomboniere
          </h1>
          <p class="mt-4 max-w-prose text-lg text-brand-dark/80">
            Doces, gelados e conveniência para o seu dia a dia.
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              routerLink="/contato"
              class="btn-primary px-6 py-4 text-lg shadow-lg"
              aria-label="Pedir agora"
            >
              Pedir agora
            </a>
            <a
              routerLink="/cardapio"
              class="btn-secondary px-6 py-3"
              aria-label="Ver produtos"
            >
              Ver produtos
            </a>
          </div>
        </div>

        <div class="relative">
          <div
            class="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-primary/20 blur-2xl"
          ></div>
          <div
            class="pointer-events-none absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-brand-accent/30 blur-2xl"
          ></div>

          <!-- Carousel container -->
          <div
            class="relative w-full overflow-hidden rounded-3xl shadow-lg"
            (mouseenter)="pause()"
            (mouseleave)="resume()"
          >
            <div
              class="relative h-72 sm:h-96"
              (pointerdown)="onPointerDown($event)"
              (pointerup)="onPointerUp($event)"
            >
              <ng-container *ngFor="let img of images; let i = index">
                <img
                  [src]="img"
                  [attr.srcset]="makeSrcset(img)"
                  [attr.sizes]="'(max-width: 640px) 100vw, 50vw'"
                  loading="lazy"
                  [attr.alt]="captions[i] || 'Produto ' + (i + 1)"
                  class="absolute inset-0 h-full w-full object-contain transition-opacity duration-700 p-4 bg-white/30"
                  [class.opacity-0]="currentIndex !== i"
                  [class.opacity-100]="currentIndex === i"
                  [style.transform]="
                    currentIndex === i ? 'translateZ(0)' : 'none'
                  "
                />
              </ng-container>

              <!-- Prev/Next -->
              <button
                (click)="prev()"
                aria-label="Anterior"
                class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
              >
                ‹
              </button>
              <button
                (click)="next()"
                aria-label="Próximo"
                class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
              >
                ›
              </button>

              <!-- Pagination -->
              <div
                class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
              >
                <button
                  *ngFor="let _ of images; let idx = index"
                  (click)="goTo(idx)"
                  [attr.aria-label]="'Ir para imagem ' + (idx + 1)"
                  [class]="
                    idx === currentIndex
                      ? 'h-2 w-8 rounded-full bg-brand-primary'
                      : 'h-2 w-2 rounded-full bg-white/80'
                  "
                ></button>
              </div>
            </div>

            <!-- Thumbnails -->
            <div
              class="hidden sm:flex items-center justify-center gap-3 bg-white/60 p-3"
            >
              <button
                *ngFor="let t of images; let j = index"
                (click)="goTo(j)"
                class="rounded overflow-hidden ring-1 ring-black/5"
                [class.opacity-60]="currentIndex !== j"
              >
                <img
                  [src]="t"
                  [attr.srcset]="makeSrcset(t)"
                  [attr.sizes]="'80px'"
                  class="h-16 w-28 object-contain bg-white"
                  loading="lazy"
                  [attr.alt]="'Miniatura ' + (j + 1)"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="container mx-auto grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div
          class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-700 ring-1 ring-brand-100"
        >
          🍬
        </div>
        <h3 class="text-lg font-semibold">Doces & Salgadinhos</h3>
        <p class="mt-1 text-sm text-brand-dark/70">
          Clássicos que todo mundo ama: bombons, guloseimas e salgadinhos
          crocantes, prontos para qualquer momento do dia.
        </p>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div
          class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent ring-1 ring-brand-accent/20"
        >
          🥤
        </div>
        <h3 class="text-lg font-semibold">Bebidas Geladas</h3>
        <p class="mt-1 text-sm text-brand-dark/70">
          Refrigerantes, água e cerveja gelada para acompanhar seu dia e deixar
          ele ainda mais refrescante.
        </p>
      </div>
      <div
        class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:col-span-2 lg:col-span-1"
      >
        <div
          class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-mint/10 text-brand-700 ring-1 ring-brand-mint/20"
        >
          🎁
        </div>
        <h3 class="text-lg font-semibold">Conveniência & Kits</h3>
        <p class="mt-1 text-sm text-brand-dark/70">
          Produtos de conveniência e kits prontos para festas e lembrancinhas.
          Uma forma prática e saborosa de transformar qualquer ocasião em algo
          especial.
        </p>
      </div>
    </section>

    <section class="py-16 bg-brand-700 text-brand-cream">
      <div class="container">
        <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 class="text-2xl font-bold tracking-tight text-brand-cream">
              Duda Bomboniere
            </h2>
            <p class="mt-4 text-brand-cream/90 max-w-prose">
              Em Itapuã, há mais de 20 anos, somos aquele ponto de alegria no
              bairro: doces, salgadinho, gelados e itens de conveniência para
              adoçar o dia de quem mora por aqui e de quem nos visita. Nosso
              compromisso é oferecer variedade, qualidade e preços que fazem
              sentido — sempre com atenção ao detalhe e ao cliente.
            </p>
            <p class="mt-4 text-brand-cream/80">
              Aqui você não é apenas mais um pedido — é parte da nossa história.
              Venha conhecer a loja ou fale conosco: será um prazer preparar
              algo especial para você.
            </p>
            <div class="mt-6 flex items-center gap-3">
              <a
                href="https://api.whatsapp.com/send?phone=557186806234&text=Ol%C3%A1%2C%20vim%20pelo%20Instagram%2C%20gostaria%20de%20um%20or%C3%A7amento!"
                target="_blank"
                rel="noopener"
                class="btn-primary px-6 py-3 bg-gradient-to-r from-brand-400 to-brand-500 text-brand-onPrimary shadow-lg hover:scale-105 transform transition"
                >Falar conosco</a
              >
            </div>

            <!-- Embedded Google Map -->
            <div class="mt-6">
              <div
                class="w-full overflow-hidden rounded-lg shadow ring-1 ring-black/5"
              >
                <iframe
                  loading="lazy"
                  class="w-full h-40 sm:h-48 md:h-56 border-0"
                  src="https://maps.google.com/maps?q=Pra%C3%A7a%20Dorival%20Caymmi%2C%202%20Itapu%C3%A3%2C%20Salvador%20BA&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="Mapa - Duda Bomboniere"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center lg:justify-end">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F841fd14bdfb245b192da835142b9cab2?format=webp&width=800"
              alt="Fachada Duda Bomboniere"
              class="w-full max-w-lg rounded-2xl object-cover shadow-xl ring-2 ring-white/5"
              style="margin-left: 13px;"
            />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit, OnDestroy {
  protected images: string[] = [
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F8db2f95d55cc49a0a5a38e590ef733fe?format=webp&width=1200",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Fd428a1da383b465188be27166066ac02?format=webp&width=1200",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Ffaf3b5c4272e4b33b4a4fa91a08da16c?format=webp&width=1200",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Faa7748ccdc124f7dafc44db0eb9f1231?format=webp&width=1200",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F030f55a8bb9e4cc09ef7d0037e467eec?format=webp&width=1200",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Fd9aaaa116f1344fcab5df3aec73c3983?format=webp&width=1200",
  ];

  protected captions: string[] = [
    "Licor gengibre com limão",
    "Licor passas",
    "Cherry Pop",
    "Talento (chocolate)",
    "Chicletes Flics",
    "Amendoim Doce",
  ];

  protected makeSrcset(url: string) {
    // remove existing width param if present then build common srcset sizes
    const base = url.replace(/(&width=)\d+/g, "");
    return `${base}&width=600 600w, ${base}&width=900 900w, ${base}&width=1200 1200w`;
  }

  // about section carousel
  protected aboutImages: string[] = [
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Fe08ca41896384096a054d2cd1a9cba27?format=webp&width=1200",
    "https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F48d00b4adb90420e818c287024aecff1?format=webp&width=1200",
  ];

  // Fixed dark palette for hero
  protected currentPaletteClass =
    "bg-gradient-to-br from-brand-400 via-brand-300 to-brand-700/10";

  protected aboutIndex = 0;
  private aboutInterval: any;
  private aboutDelay = 4500;

  protected currentIndex = 0;
  private intervalRef: any;
  private autoplayDelay = 4000;
  private paused = false;

  // pointer swipe helpers
  private pointerDownX: number | null = null;
  private pointerDownTime = 0;
  private swipeThreshold = 50; // pixels

  ngOnInit(): void {
    this.startAutoplay();
    this.startAboutAutoplay();
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
    this.clearAboutAutoplay();
  }

  private startAutoplay() {
    this.clearAutoplay();
    this.intervalRef = setInterval(() => {
      if (!this.paused) this.next();
    }, this.autoplayDelay);
  }

  private clearAutoplay() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
      this.intervalRef = null;
    }
  }

  protected pause() {
    this.paused = true;
    this.clearAutoplay();
  }

  protected resume() {
    this.paused = false;
    this.startAutoplay();
  }

  protected next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  protected prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  protected goTo(i: number) {
    this.currentIndex = i;
  }

  // about carousel controls
  protected aboutNext() {
    this.aboutIndex = (this.aboutIndex + 1) % this.aboutImages.length;
  }

  protected aboutPrev() {
    this.aboutIndex =
      (this.aboutIndex - 1 + this.aboutImages.length) % this.aboutImages.length;
  }

  protected aboutGoTo(i: number) {
    this.aboutIndex = i;
  }

  private startAboutAutoplay() {
    this.clearAboutAutoplay();
    this.aboutInterval = setInterval(() => this.aboutNext(), this.aboutDelay);
  }

  private clearAboutAutoplay() {
    if (this.aboutInterval) {
      clearInterval(this.aboutInterval);
      this.aboutInterval = null;
    }
  }

  protected aboutPause() {
    if (this.aboutInterval) {
      clearInterval(this.aboutInterval);
      this.aboutInterval = null;
    }
  }

  protected aboutResume() {
    if (!this.aboutInterval) this.startAboutAutoplay();
  }

  // pointer events for swipe support
  protected onPointerDown(event: PointerEvent) {
    this.pointerDownX = event.clientX;
    this.pointerDownTime = Date.now();
    this.pause();
  }

  protected onPointerUp(event: PointerEvent) {
    if (this.pointerDownX == null) return;
    const dx = event.clientX - this.pointerDownX;
    const dt = Date.now() - this.pointerDownTime;
    // basic swipe detection
    if (Math.abs(dx) > this.swipeThreshold && dt < 1000) {
      if (dx < 0) this.next();
      else this.prev();
    }
    this.pointerDownX = null;
    this.pointerDownTime = 0;
    // resume autoplay after short delay
    setTimeout(() => this.resume(), 500);
  }

  // keyboard navigation
  @HostListener("window:keydown", ["$event"])
  handleKey(ev: KeyboardEvent) {
    if (ev.key === "ArrowRight") this.next();
    if (ev.key === "ArrowLeft") this.prev();
  }
}
