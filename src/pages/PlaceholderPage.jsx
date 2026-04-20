export function PlaceholderPage({ title }) {
  return (
    <section className="flex-1 px-10 pb-12 flex flex-col items-center justify-center space-y-4">
      <span className="material-symbols-outlined text-[80px] text-surface-dim">construction</span>
      <h2 className="text-[32px] font-bold text-on-surface-variant">Chưa có nội dung cho {title}</h2>
      <p className="text-[18px] text-on-surface-variant text-center max-w-lg">
        Trang này đang được xây dựng. Vui lòng quay lại Trang chủ hoặc khám phá các mục khác.
      </p>
    </section>
  );
}
