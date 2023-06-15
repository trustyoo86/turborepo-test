import { useEffect } from "react";
import { useSWRConfig } from 'swr';

export default function AboutDetail() {
  console.log(useSWRConfig());
  useEffect(() => {
    console.log('testtest');
  }, []);

  const handleClick = () => {
    alert('test!!');
  };

  return (
    <div>
      About Detail
      <button onClick={handleClick}>click me!!</button>
    </div>
  );
}