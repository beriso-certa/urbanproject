import { RevealOnScroll } from "../components/gsap/RevealsOnScroll";

interface Props {
  quote?: string;
  author?: string;
  role?: string;
}

const QuoteSection: React.FC<Props> = ({ quote, author, role }) => {
  if (!quote) return null;

  return (
    <section className="section">
      <RevealOnScroll className="grid gap-8 md:grid-cols-[1.3fr,1fr] items-center">
        <div className="bg-brand-red text-black p-8 rounded-lg relative overflow-hidden">
          <div className="absolute text-[120px] font-display font-bold text-black/20 -top-10 -left-4">
            &ldquo;
          </div>
          <p className="relative text-sm md:text-base font-medium leading-relaxed">
            {quote}
          </p>
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em]">
            {author && <span>{author}</span>}
            {role && <span className="block text-black/70 mt-1">{role}</span>}
          </div>
        </div>
        <div>
          <p className="section-title">Why Urban</p>
          <h3 className="section-heading">Brands choose us for the work we feel.</h3>
          <p className="text-sm text-gray-300">
            From first concept to final delivery, we are embedded with your
            team, shaping stories that resonate with real people and real
            culture.
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default QuoteSection;