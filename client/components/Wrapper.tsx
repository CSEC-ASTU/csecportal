"use client";

import React from "react";

import { Provider } from "react-redux";
import { makeStore } from "@/lib/features/store";
import { Toaster } from "sonner";
const store = makeStore();

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div>{children}</div>
      <Toaster />
    </Provider>
  );
}
