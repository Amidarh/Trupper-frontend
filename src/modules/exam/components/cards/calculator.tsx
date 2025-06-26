"use client";

import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn, bgBlur } from "@/lib/utils";

const normalButtons = [
  ["AC", "DEL", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="]
];

const scientificExtras = [
  ["sin", "cos", "tan", "sqrt"],
  ["log", "ln", "^"],
];

export function Calculator({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"normal" | "scientific">("normal");

  const handleClick = (val: string) => {
    if (val === "AC") return setInput("");
    if (val === "DEL") return setInput(input.slice(0, -1));
    if (val === "=") return evaluateExpression();

    if (["sin", "cos", "tan", "log", "ln", "sqrt"].includes(val)) {
      setInput(input + `${val}(`);
    } else if (val === "^") {
      setInput(input + "**");
    } else {
      setInput(input + val);
    }
  };

  const evaluateExpression = () => {
    try {
      const replaced = input
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(");

      const result = eval(replaced);
      setInput(String(result));
    } catch (err) {
      setInput("Error");
      console.log("Error evaluating expression:", err);
    }
  };

  const renderButtons = () => {
    const combined =
      mode === "scientific"
        ? [...scientificExtras, ...normalButtons]
        : normalButtons;

    return combined.flat().map((btn) => (
      <button
        key={btn}
        onClick={() => handleClick(btn)}
        className={`p-2 rounded-xl border cursor-pointer font-medium ${
          btn === "="
            ? "bg-green-600 hover:bg-green-700 col-span-1"
            : ""
        }`}
      >
        {btn}
      </button>
    ));
  };

  return (
    <>
      {/* <Head>
        <title>Scientific Calculator</title>
      </Head> */}
      <main className={cn("border rounded-xl top-22 right-5 flex items-center justify-center p-4 z-10", isOpen ? "fixed" : "hidden", bgBlur)}>
        <div className="w-[280px]">
          <div className="flex justify-end items-center mb-2">
            {/* <Button
              onClick={() =>
                setMode(mode === "normal" ? "scientific" : "normal")
              }
              className="cursor-pointer h-7 text-sm rounded-full"
            >
              switch
            </Button> */}
            <div>
              <X
                onClick={onToggle}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="text-right text-2xl border overflow-x-scroll text-nowrap p-4 rounded-t-xl min-h-[60px] break-words">
            <p>
              {input || "0"}
            </p>
          </div>
          <div
            className={`grid gap-2 border p-4 rounded-b-xl ${
              mode === "scientific" ? "grid-cols-4" : "grid-cols-4"
            }`}
          >
            {renderButtons()}
          </div>
        </div>
      </main>
    </>
  );
}
