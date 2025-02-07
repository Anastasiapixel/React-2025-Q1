import {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  MouseEventHandler,
} from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

export interface PersonType {
  name: string;
  birth_year: string;
}
interface PropsType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  results: PersonType[];
  callbackResults: (results: PersonType[]) => void;
  loaderResult: (isLoad: boolean) => void;
}

export const Forms = (props: PropsType) => {
  const [name, setName] = useState<string>('');
  const { storagename, setStoragename } = useLocalStorage('', 'storagename');
  const [results, setResults] = useState<PersonType[]>([]);
  const [error, setError] = useState<boolean>(false);

  const onUpdateSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.value;
    setName(name);
  };
  const handleClick = () => {
    setStoragename(name);
    setTimeout(() => {
      onUpdateStorage();
    }, 10);
  };

  const onUpdateStorage = useCallback(async () => {
    props.loaderResult(true);
    const characters = await props.getPeople(storagename(name));
    setResults(characters.results);
    setTimeout(() => {
      props.callbackResults(characters.results);
      setName(storagename(name));
      characters.results.map((person) => person.name);
      characters.results.map((person) => person.birth_year);
      props.loaderResult(false);
    }, 700);
  }, [props, name, results]);

  useEffect(() => {
    if (results.length === 0) {
      onUpdateStorage();
      setResults(results);
      props.loaderResult(true);
    }
  }, [onUpdateStorage, props, results]);

  useLayoutEffect(() => {
    setName(storagename(name));
  }, []);

  const errorMessage: MouseEventHandler<HTMLButtonElement> | boolean = () => {
    setError(true);
  };
  if (error === true) {
    throw new Error('Error');
  }
  return (
    <div className="search">
      <input onChange={onUpdateSearch} value={name} type="text" />
      <button onClick={handleClick}>Search</button>
      <button onClick={errorMessage}>Error's button</button>
    </div>
  );
};