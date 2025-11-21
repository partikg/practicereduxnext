"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/redux/slice/counterSlice";

export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())} className="bg-blue-500 text-white px-4 py-2 m-2">
        Increment
      </button>
      <button onClick={() => dispatch(decrement())} className="bg-red-500 text-white px-4 py-2 m-2">
        Decrement
      </button>
    </div>
  );
}
