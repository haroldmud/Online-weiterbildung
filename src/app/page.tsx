import Header from "@/components/Header";
import Content from "@/components/content";

export default function Home() {
  return (
    <section>
      <Header />
      <section className="flex justify-center">
        <section className="max-w-[1000px] w-full">
          <Content />
        </section>
      </section>
    </section>
  );
}
