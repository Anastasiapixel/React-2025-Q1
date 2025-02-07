import { Component, ChangeEvent } from 'react';
import { flushSync } from 'react-dom';

export interface PersonType {
  name: string;
  birth_year: string;
  results: PersonType[];
}

interface FormState {
  name: string;
  results: PersonType[];
  error: boolean;
}

interface PropsType {
  getPeople: (name: string) => Promise<{ results: PersonType[] }>;
  results: PersonType[];
  callbackResults: (results: PersonType[]) => void;
}
export class Forms extends Component<PropsType, FormState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      name: '',
      results: [],
      error: false,
    };
  }
  onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    this.setState({ name });
  };
  onUpdateStorage = async () => {
    localStorage.setItem('name', this.state.name);
    const characters = await this.props.getPeople(this.state.name);

    flushSync(() => {
      this.setState({ results: characters.results });
    });

    const names = this.state.results.map((person) => person.name);
    const date = this.state.results.map((person) => person.birth_year);
    console.log(date);
    console.log(names);
  };

  handleClick = () => {
    this.setState({ results: this.props.results });
    this.onUpdateStorage();
    this.props.callbackResults(this.state.results);
  };

  async componentDidMount() {
    await this.onUpdateStorage();
    this.setState({ results: this.props.results });
    this.props.callbackResults(this.state.results);
  }

  componentDidUpdate(prevProps: PropsType, prevState: FormState) {
    if (
      this.state.results == prevState.results ||
      this.props.callbackResults !== prevProps.callbackResults
    ) {
      this.onUpdateStorage();
    }
  }

  render() {
    const errorMessage = () => {
      this.setState({ error: true });
    };
    if (this.state.error === true) {
      throw new Error('Something went wrong');
    }
    return (
      <div className="search">
        <input onChange={this.onUpdateSearch} type="text" name="" id="" />
        <button onClick={this.handleClick}>Search</button>
        <button onClick={errorMessage}>Errors button</button>
      </div>
    );
  }
}
