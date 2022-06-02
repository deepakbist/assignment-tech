import { createRoot } from 'react-dom/client';
import App from './app-root';

const container = document.getElementById('main');
const root = createRoot(container as Element);
root.render(<App />);
