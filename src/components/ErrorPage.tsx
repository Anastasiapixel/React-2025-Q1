import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const back = useNavigate();
  const backError = () => {
    history.go(0);
    back(-1);
  };
  return (
    <div className="errors">
      <h1>404 PAGE NOT FOUND</h1>
      <h2>Something went wrong</h2>
      <p>Please try again later</p>
      <button onClick={backError}>Try again</button>
    </div>
  );
};
