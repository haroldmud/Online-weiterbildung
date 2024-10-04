import Header from "@/components/Header";
import Content from "@/components/content";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <section className="flex flex-col justify-between h-[100vh]">
      <section>
      <Header />
      <section className="flex justify-center">
        <section className="max-w-[1000px] w-full">
          <Content />
        </section>
      </section>
      </section>
      <Footer />
    </section>
  );
}
