import { useState, useCallback, useEffect } from "react";
import { Button } from "ui";

export default function Web() {
  const [count, setCount] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const testEffect = useCallback(() => {
    console.log('test');
  }, []);

  const handleCount = () => {
    setCount(prev => prev + 1);
  };

  const countEffect = useCallback(() => {
    if (count % 2 === 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [count]);

  useEffect(testEffect, [testEffect]);
  useEffect(countEffect, [countEffect]);

  return (
    <div>
      <h1>Web</h1>
      {
        show && <div>Show!!!!!</div>
      }
      <p>Button clicked {count} times!!</p>
      <button onClick={handleCount}>CLick me!</button>
    </div>
  );
}
