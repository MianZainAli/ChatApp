import './App.css';
import { RouterProvider } from 'react-router-dom';
import Chat from './components/Chat';
import router from './router/router';

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
);
}

export default App;
