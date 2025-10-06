import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef,
  QueryList,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sobre",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container mx-auto py-20">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 class="text-3xl font-extrabold text-brand-dark">
            Duda Bomboniere: Há mais de 20 anos adoçando Itapuã
          </h1>

          <p class="mt-6 text-lg text-brand-dark/80">
            Há mais de duas décadas, a Duda Bomboniere é sinônimo de sabor e
            tradição em Itapuã. Nosso compromisso é simples: oferecer doces,
            salgadinhos e bebidas geladas que tornam o dia a dia mais gostoso e
            especial.
          </p>

          <p class="mt-4 text-base text-brand-dark/80">
            <strong class="font-extrabold text-brand-primary"
              >Venha nos visitar e descubra por que a Duda Bomboniere é o ponto
              doce de Itapuã!</strong
            >
          </p>

          <div class="mt-6 flex gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=557186806234&text=Ol%C3%A1%2C%20vim%20pelo%20site%2C%20gostaria%20de%20um%20or%C3%A7amento!"
              target="_blank"
              rel="noopener"
              class="btn-primary px-5 py-3"
              >Falar conosco</a
            >
            <a
              href="https://maps.app.goo.gl/Xa8ZEXTkdicEzcie6"
              target="_blank"
              rel="noopener"
              class="btn-secondary px-5 py-3"
              >Ver no Maps</a
            >
          </div>
        </div>

        <div class="flex items-center justify-center lg:justify-end">
          <div class="w-full max-w-xl">
            <div class="relative" style="padding-top:56.25%">
              <iframe
                loading="lazy"
                class="absolute inset-0 w-full h-full rounded-lg shadow-sm border-0"
                src="https://www.youtube.com/embed/m83R9fQeMdo"
                title="YouTube Shorts - Duda Bomboniere"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="container mx-auto py-12">
      <h2 class="text-2xl font-bold text-brand-dark mb-6 text-center w-full">
        Nossa História
      </h2>
      <div class="relative">
        <!-- Horizontal line (desktop) -->
        <div
          class="hidden md:block absolute left-8 right-8 top-20 h-px bg-brand-100"
        ></div>

        <div
          class="flex flex-nowrap md:flex-wrap items-start gap-8 overflow-x-auto md:overflow-visible py-6 justify-center"
        >
          <!-- Item 1 -->
          <div
            #timelineItem
            class="timeline-item flex w-96 flex-col items-center text-center"
          >
            <div
              class="-mt-6 mb-4 flex h-44 w-96 md:h-48 md:w-96 items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F0ae61b9a17df4acc805b42cbcf925f3a?format=webp&width=1200"
                alt="Duda antiga"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              class="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white font-bold"
            >
              1
            </div>
            <h4 class="mt-3 font-semibold text-brand-dark">Origem</h4>
            <p class="mt-2 text-sm text-brand-dark/70">
              O começo humilde que deu origem à nossa tradição local.
            </p>
          </div>

          <!-- Item 2 -->
          <div
            #timelineItem
            class="timeline-item flex w-96 flex-col items-center text-center"
          >
            <div
              class="-mt-6 mb-4 flex h-44 w-96 md:h-48 md:w-96 items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2F841fd14bdfb245b192da835142b9cab2?format=webp&width=1200"
                alt="Duda evolução"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              class="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-white font-bold"
            >
              2
            </div>
            <h4 class="mt-3 font-semibold text-brand-dark">Crescimento</h4>
            <p class="mt-2 text-sm text-brand-dark/70">
              Expansão e consolidação na comunidade de Itapuã.
            </p>
          </div>

          <!-- Item 3 -->
          <div
            #timelineItem
            class="timeline-item flex w-96 flex-col items-center text-center"
          >
            <div
              class="-mt-6 mb-4 flex h-44 w-96 md:h-48 md:w-96 items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F50dd6d1ff3874853aeda9539f8da9b65%2Fe550641cf613413fa8c710542f702d3a?format=webp&width=1200"
                alt="Duda hoje"
                class="h-full w-full object-cover"
              />
            </div>
            <div
              class="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-mint text-white font-bold"
            >
              3
            </div>
            <h4 class="mt-3 font-semibold text-brand-dark">Hoje</h4>
            <p class="mt-2 text-sm text-brand-dark/70">
              A Duda como referência em variedade, tradição e atendimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SobreComponent implements AfterViewInit, OnDestroy {
  @ViewChildren("timelineItem", { read: ElementRef })
  protected timelineItems!: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("in-view");
          } else {
            el.classList.remove("in-view");
          }
        }
      },
      { threshold: 0.35 },
    );

    this.timelineItems.forEach((item: ElementRef) => {
      this.observer?.observe(item.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
