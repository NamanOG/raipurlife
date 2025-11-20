import { useScrollReveal } from "@/hooks/useScrollReveal";

const Contact = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  return (
    <section ref={sectionRef} className="py-16 px-4 scroll-reveal">
      <div className="container mx-auto max-w-xl">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">Contact & Community</h1>
        <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
          Have questions, feedback, or want to join the community? Reach out below!
        </p>
        <form className="space-y-6 animate-fade-in">
          <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-card/80 border border-primary/30 text-foreground focus:outline-none focus:border-primary" />
          <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg bg-card/80 border border-secondary/30 text-foreground focus:outline-none focus:border-secondary" />
          <textarea placeholder="Your Message" className="w-full p-3 rounded-lg bg-card/80 border border-accent/30 text-foreground focus:outline-none focus:border-accent" rows={4} />
          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300">Send Message</button>
        </form>
        <div className="mt-8 text-center text-muted-foreground animate-fade-in">
          Or connect with us on social media!
        </div>
      </div>
    </section>
  );
};

export default Contact;
