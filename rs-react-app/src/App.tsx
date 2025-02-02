import { Component, Suspense } from 'react';
import { Forms, PersonType } from './components/forms';
import { Result } from './components/result';

interface AppType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  callbackResults: (value: string[]) => void;
  names: string[];
  results: PersonType[];
  name: string;
}
const getPeople: AppType['getPeople'] = async (
  name: string
): Promise<{ results: PersonType[] }> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${name}&format=json`
  );
  const data = await response.json();

  return data;
};

export default class SearchApp extends Component {
  state: {
    results: PersonType[];
    names: string[];
    date: string[];
    name: string;
  } = {
    results: [],
    names: [],
    date: [],
    name: '',
  };

  callbackResults = (value: PersonType[]) => {
    this.setState({ results: value });
  };

  render() {
    return (
      <div className="block">
        <div className="first">
          <Forms
            getPeople={getPeople}
            results={this.state.results}
            callbackResults={this.callbackResults}
          />
        </div>
        <div className="second">
          <Suspense fallback={<div>Loading...</div>}>
            <Result
              names={this.state.results.map((person) => person.name)}
              date={this.state.results.map((person) => person.birth_year)}
            />
          </Suspense>
        </div>
      </div>
    );
  }
}
