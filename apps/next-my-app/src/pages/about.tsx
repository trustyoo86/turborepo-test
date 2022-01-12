import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { nameState } from '../recoil/atoms/name';

export default function About() {
  const [name, setNameState] = useRecoilState(nameState);

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameState(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold underline">Profile</h1>
      <p>Hello, {name}</p>
      <input
        type="text"
        name="name"
        id="input_name"
        onChange={updateName}
        placeholder="enter your name"
      />
    </div>
  );
}
