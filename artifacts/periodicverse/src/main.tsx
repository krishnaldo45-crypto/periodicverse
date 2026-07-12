import './index.css';
import { initApp } from './app';

const root = document.getElementById('root');
if (root) {
  root.innerHTML = '';
  initApp(root);
}
