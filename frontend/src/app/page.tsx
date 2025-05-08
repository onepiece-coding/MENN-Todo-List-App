import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks Page",
};

export default function HomePage() {
  return (
    <section className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-xl">Home Page</h1>
    </section>
  );
}
