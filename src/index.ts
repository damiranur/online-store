import { header } from './scripts/components/header/header';
import { main } from './scripts/components/main/main';
import { state } from './scripts/state/state';

const body = document.body;

body.append(header);
body.append(main);
