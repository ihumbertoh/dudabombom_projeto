import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="container mx-auto py-16">
      <div
        class="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5"
      >
        <h1 class="text-2xl font-bold text-brand-dark">Contato</h1>
        <p class="mt-2 text-sm text-brand-dark/70">
          Envie uma mensagem pelo WhatsApp para solicitar orçamento ou tirar
          dúvidas.
        </p>

        <form
          #contactForm="ngForm"
          (ngSubmit)="sendWhatsApp(contactForm)"
          class="mt-6 grid gap-4"
        >
          <input
            [(ngModel)]="name"
            name="name"
            type="text"
            aria-label="Seu nome"
            placeholder="Seu nome"
            class="w-full rounded-md border p-3"
            required
          />
          <div *ngIf="submitted && !name" class="text-sm text-red-600">
            Por favor insira seu nome.
          </div>
          <input
            [(ngModel)]="phone"
            name="phone"
            type="text"
            aria-label="Telefone (opcional)"
            placeholder="Telefone (opcional)"
            class="w-full rounded-md border p-3"
          />
          <textarea
            [(ngModel)]="message"
            name="message"
            aria-label="Mensagem"
            rows="4"
            placeholder="Mensagem"
            class="w-full rounded-md border p-3"
            required
          ></textarea>
          <div *ngIf="submitted && !message" class="text-sm text-red-600">
            Por favor escreva uma mensagem.
          </div>

          <div
            *ngIf="successMessage"
            class="rounded-md bg-green-50 p-3 text-green-800"
            role="status"
            aria-live="polite"
          >
            {{ successMessage }}
          </div>

          <div class="flex items-center gap-3">
            <button
              type="submit"
              class="btn-primary px-5 py-3"
              aria-label="Enviar via WhatsApp"
              [disabled]="submitting"
            >
              <span *ngIf="!submitting">Enviar via WhatsApp</span>
              <span *ngIf="submitting">Enviando...</span>
            </button>
            <a
              class="btn-secondary px-5 py-3"
              href="https://www.instagram.com/dudabombonierie/"
              target="_blank"
              rel="noopener"
              aria-label="Abrir Instagram"
              >Instagram</a
            >
          </div>

          <!-- LGPD Modal -->
          <div
            *ngIf="lgpdOpen"
            class="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div
              class="absolute inset-0 bg-black/40"
              (click)="closeLgpd()"
              aria-hidden="true"
            ></div>
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Informações sobre a LGPD"
              class="relative max-w-2xl w-full bg-white rounded-lg shadow-xl ring-1 ring-black/5 overflow-auto"
              style="max-height:80vh;"
            >
              <div class="p-6">
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-lg font-semibold">
                    LGPD — Lei Geral de Proteção de Dados
                  </h3>
                  <button
                    type="button"
                    aria-label="Fechar"
                    class="text-sm text-brand-dark/60 hover:text-brand-dark"
                    (click)="closeLgpd()"
                  >
                    ✕
                  </button>
                </div>

                <div class="mt-4 space-y-4 text-sm text-brand-dark/80">
                  <p>
                    Respeitamos a sua privacidade e tratamos os dados pessoais
                    com responsabilidade. As informações que você nos enviar por
                    meio deste formulário ou via WhatsApp serão utilizadas
                    apenas para responder à sua solicitação e, quando aplicável,
                    para processar pedidos ou orçamentos.
                  </p>

                  <p>
                    Finalidade: Entrar em contato, prestar suporte, fornecer
                    orçamentos e informações comerciais relacionadas aos
                    serviços e produtos oferecidos pela Duda Bomboniere.
                  </p>

                  <p>
                    Base legal: Tratamos seus dados com base no seu
                    consentimento e, quando necessário, para execução de
                    contrato, obrigação legal ou interesse legítimo para fins
                    comerciais e de atendimento.
                  </p>

                  <p>
                    Direitos: Você tem o direito de acessar, corrigir, solicitar
                    a portabilidade, limitar o tratamento, se opor ao tratamento
                    e solicitar a eliminação dos seus dados pessoais. Para
                    exercer seus direitos ou obter mais informações, entre em
                    contato conosco pelo WhatsApp ou por meio dos canais
                    oficiais.
                  </p>

                  <p>
                    Segurança: Adotamos medidas técnicas e administrativas
                    razoáveis para proteger os dados contra acesso não
                    autorizado, alteração ou divulgação. Contudo, nenhum método
                    de transmissão pela internet é 100% seguro.
                  </p>

                  <p>
                    Contato: Para solicitações relacionadas a dados pessoais,
                    envie uma mensagem para nosso WhatsApp:
                    <a
                      href="https://api.whatsapp.com/send?phone=557186806234"
                      class="underline"
                      >(71) 8680-6234</a
                    >
                  </p>
                </div>

                <div class="mt-6 flex justify-end">
                  <button
                    type="button"
                    class="btn-secondary px-4 py-2"
                    (click)="closeLgpd()"
                  >
                    Entendi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="mt-8">
          <div class="mt-3 flex items-center gap-3">
            <a
              href="https://maps.app.goo.gl/fE2MF4fonp6y4wkPA"
              target="_blank"
              rel="noopener"
              class="btn-primary px-4 py-2"
              >Ver localização no Google Maps</a
            >

            <button
              type="button"
              class="btn-secondary px-4 py-2"
              (click)="openLgpd()"
            >
              LGPD - Proteção de Dados
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected name = "";
  protected phone = "";
  protected message = "";

  protected lgpdOpen = false;

  // UX state
  protected submitted = false;
  protected submitting = false;
  protected successMessage = "";

  protected sendWhatsApp(form?: NgForm) {
    this.submitted = true;
    if (form && !form.valid) return;
    if (!this.name || !this.message) return;

    this.submitting = true;
    const phoneNumber = "557186806234";
    const base = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    const text = encodeURIComponent(
      `Olá, vim pelo site. Nome: ${this.name}. Telefone: ${this.phone}. Mensagem: ${this.message}`,
    );
    const url = `${base}&text=${text}`;
    window.open(url, "_blank");

    this.successMessage =
      "Mensagem preparada — você será redirecionado ao WhatsApp.";
    setTimeout(() => (this.successMessage = ""), 4000);

    this.submitting = false;
    if (form) form.resetForm();
    this.submitted = false;
    this.name = "";
    this.phone = "";
    this.message = "";
  }

  protected openLgpd() {
    this.lgpdOpen = true;
  }

  protected closeLgpd() {
    this.lgpdOpen = false;
  }
}
