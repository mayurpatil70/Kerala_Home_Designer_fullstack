import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound__inner container">
        <p className="eyebrow eyebrow--light">Error 404</p>
        <h1 className="notfound__title">This page isn&apos;t on the plan.</h1>
        <p className="notfound__text">The page you are looking for may have moved or no longer exists.</p>
        <div className="notfound__actions">
          <Button href="/" variant="sky">Back to home</Button>
          <Button href="/contact" variant="outline-light">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
