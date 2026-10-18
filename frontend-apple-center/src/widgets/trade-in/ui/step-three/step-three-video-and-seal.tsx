import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

export function StepThreeVideoAndSeal() {
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  const handleDownloadPdf = () => {
    toast.success("Download do Laudo Técnico Iniciado", {
      description: "Arquivo Laudo-Pericial-TRD89420.pdf assinado com certificado ICP-Brasil.",
    });
  };

  return (
    <>
      {/* Video Inspection Player Preview Card */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              Gravação da Perícia em Bancada
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant font-mono">
              03:42 • 1080p 60fps
            </span>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsPlayingVideo(true)}
            onKeyDown={(e) => e.key === "Enter" && setIsPlayingVideo(true)}
            className="relative w-full h-44 rounded-lg overflow-hidden bg-surface-container-high group cursor-pointer mt-1"
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwxjJgaUpmflEyAyZsiYrH4AKGQ8K7ObZHVBc_xoJaopsJpMVmcaX41ILUxFgUqwKf1jVzxs0n4ITdOCSoYazcD9XDqNWk3OY0hrUamX6f_10YcMMJkm0FajR5hbucFEK9o34u4_cEydL5F5oQvJogyScwAkmg-IMLQoONBgZPVpLnPuRIdsPP5XSwZiFJD-_F7-GuK4EwUMZFqtpR4cMT6Qr2BasHfjgkCMHEUsSvsgJIpL-RFdEokw"
              alt="Bancada laboratorial estéril com perito Apple inspecionando iPhone"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-primary/40 flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px] ml-1" aria-hidden="true">
                  play_arrow
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-primary bg-primary/70 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                Assistir Vistoria Filmada
              </span>
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-label-sm text-[10px]">
              Rec: CAM-SP-04 • Bancada Estéril 02
            </div>
          </div>

          {isPlayingVideo && (
            <div className="mt-3 p-3 rounded-lg bg-secondary-container/20 border border-secondary/30 flex items-center justify-between text-body-sm text-secondary">
              <span className="flex items-center gap-2 font-medium">
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                Streaming de alta resolução autenticado via SHA256 em execução.
              </span>
              <button
                type="button"
                onClick={() => setIsPlayingVideo(false)}
                className="font-label-sm underline font-bold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Authenticity Seal & Hash Certificate Card */}
      <section className="w-full mb-space-lg">
        <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm border border-outline-variant/15">
          <div className="flex items-start gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-secondary-container text-[22px]" aria-hidden="true">
                workspace_premium
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-label-lg text-label-lg text-primary font-bold">
                Laboratório Apple Center São Paulo
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Certificação de Conformidade Hardware Apple v4.2
              </p>
              <div className="mt-space-xs p-2 rounded bg-surface-container-lowest font-mono text-[10px] text-outline break-all border border-outline-variant/20">
                SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
              </div>
              <div className="mt-space-sm flex items-center justify-between flex-wrap gap-2">
                <span className="font-label-sm text-[11px] text-secondary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                    lock
                  </span>
                  Assinatura ICP-Brasil
                </span>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    picture_as_pdf
                  </span>
                  <span>Baixar Laudo (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
