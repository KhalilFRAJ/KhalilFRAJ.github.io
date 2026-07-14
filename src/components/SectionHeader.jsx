export default function SectionHeader({ tag, title, titleHtml, subtitle }) {
  return (
    <div className="rv">
      <div className="section-tag">{tag}</div>
      {titleHtml ? (
        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: titleHtml }} />
      ) : (
        <h2 className="section-title">{title}</h2>
      )}
      <div className="section-divider" />
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
