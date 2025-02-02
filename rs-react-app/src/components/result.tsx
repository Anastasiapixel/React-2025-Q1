import { Component } from 'react';
type ResultProps = {
  names: string[];
  date: string[];
};
export class Result extends Component<ResultProps> {
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      name: '',
      results: [],
      names: [],
      date: [],
    };
  }

  render() {
    return (
      <div className="resultblock">
        {this.props.names.map((name, index) => (
          <div key={index}>
            <h1 key={index}>{name}</h1>
            <p>Birth year: {this.props.date[index]}</p>
          </div>
        ))}
      </div>
    );
  }
}
