import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type ResultProps = {
  names: string[];
  date: string[];
};

export const Result: React.FC<ResultProps> = ({ names, date }) => {
  const [searchParams] = useSearchParams();
  return (
    <>
      <Link to={`/?name=${searchParams.get('name')}`} className={'link'} />
      <div className="resultblock">
        {names.map((name, index) => (
          <div key={index}>
            <h1 key={index}>{name}</h1>
            <p>Birth year: {date[index]}</p>
          </div>
        ))}
      </div>
    </>
  );
};
