import { useState } from "react";
import Header from "./components/Header";
import ToDoCard from "./components/ToDoCard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Header />
      <h2 className="heading-title">
        Organize your tasks, track deadlines, and stay productive.
      </h2>
      <ToDoCard />
      <Footer />
    </div>
  );
}
