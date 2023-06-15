'use client';

export default function Button() {
  const handleClick = () => {
    alert('clicked!');
  };

  return (<button onClick={handleClick}>Click me!</button>);
}