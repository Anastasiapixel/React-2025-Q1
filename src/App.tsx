import { useCallback, useState } from 'react';
import { Forms, PersonType } from './components/forms';
import { Result } from './components/result';
import { Pagination } from './components/pagination';

export interface AppType {
  getPeople: (name: string) => Promise<{
    results: PersonType[];
    next: string;
    previous: string;
    page: number;
  }>;
  callbackResults: (value: string[]) => void;
  names: string[];
  results: string[];
  name: string;
  setLoaderResult: (isLoad: boolean) => void;
  isLoad: boolean;
}

const getPeople: AppType['getPeople'] = async (
  name: string
): Promise<{
  results: PersonType[];
  next: string;
  previous: string;
  page: number;
}> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${1}&search=${name}&format=json`
  );
  const data = await response.json();
  return data;
};

export const SearchApp = () => {
  const callbackResults = useCallback((value: PersonType[]) => {
    setResults(value);
  }, []);
  const [results, setResults] = useState<PersonType[]>([]);
  const [loaderResult, setLoaderResult] = useState<AppType['isLoad']>(false);
  const [nextPageLink, setNextPageLink] = useState<string>('');
  const [prevPageLink, setPrevPageLink] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleNextClick = useCallback(async () => {
    setLoaderResult(true);
    const response = await fetch(nextPageLink);
    const characters = await response.json();
    setLoaderResult(false);
    setResults(characters.results);
    setNextPageLink(characters.next);
    setPrevPageLink(characters.previous);
  }, [nextPageLink]);

  const handlePrevClick = useCallback(async () => {
    setLoaderResult(true);
    const response = await fetch(prevPageLink);
    const characters = await response.json();
    setLoaderResult(false);
    setResults(characters.results);
    setPrevPageLink(characters.previous);
    setNextPageLink(characters.next);
  }, [prevPageLink]);

  const currentPageNumber = useCallback(() => {
    return currentPage;
  }, [currentPage]);

  return (
    <div className="block">
      <div className="first">
        <Forms
          getPeople={getPeople}
          callbackResults={callbackResults}
          results={results}
          loaderResult={setLoaderResult}
          setNextPageLink={setNextPageLink}
          setPrevPageLink={setPrevPageLink}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="second">
        <div className={loaderResult ? 'loader' : 'loaderHide'}>Loading...</div>
        <Result
          names={results.map((person) => person.name)}
          date={results.map((person) => person.birth_year)}
        />
        <Pagination
          currentPage={currentPage}
          currentPageNumber={currentPageNumber}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </div>
  );
};

export default SearchApp;
